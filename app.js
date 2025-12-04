// RSS Feed URLs
const FEEDS = {
    'gym-mix': {
        url: 'https://media.rss.com/club-vibez-mini-mix/feed.xml',
        name: 'Club Vibez Gym Mix'
    },
    'club-vibez': {
        url: 'https://media.rss.com/club-vibez/feed.xml',
        name: 'Club Vibez'
    }
};

// Server API endpoint (primary) with CORS proxy fallbacks
// Disabled server proxy - using external proxies for now
const USE_SERVER_PROXY = false;
const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest='
];

// State
let currentFeed = null;
let currentEpisodes = [];
let currentEpisodeIndex = -1;
let isPlaying = false;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const podcastPage = document.getElementById('podcast-page');
const audioPlayer = document.getElementById('audio-player');
const audioElement = document.getElementById('audio-element');
const loadingEl = document.getElementById('loading');

// Landing page elements
const podcastCards = document.querySelectorAll('.podcast-card');

// Podcast page elements
const backBtn = document.getElementById('back-btn');
const podcastCoverImg = document.getElementById('podcast-cover-img');
const podcastTitle = document.getElementById('podcast-title');
const podcastDescription = document.getElementById('podcast-description');
const episodeCount = document.getElementById('episode-count');
const episodesList = document.getElementById('episodes-list');

// Player elements
const playerCover = document.getElementById('player-cover');
const playerTitle = document.getElementById('player-title');
const playerPodcast = document.getElementById('player-podcast');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const volumeBtn = document.getElementById('volume-btn');
const rewindBtn = document.getElementById('rewind-btn');
const forwardBtn = document.getElementById('forward-btn');
const closePlayerBtn = document.getElementById('close-player');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    audioElement.volume = 0.8;
});

function initEventListeners() {
    // Podcast card clicks
    podcastCards.forEach(card => {
        card.addEventListener('click', () => {
            const feedId = card.dataset.feed;
            loadPodcast(feedId);
        });
    });

    // Back button
    backBtn.addEventListener('click', showLandingPage);

    // Player controls
    playPauseBtn.addEventListener('click', togglePlayPause);
    rewindBtn.addEventListener('click', () => seekRelative(-15));
    forwardBtn.addEventListener('click', () => seekRelative(15));
    
    // Progress bar
    progressBar.addEventListener('input', seekTo);
    
    // Volume control
    volumeSlider.addEventListener('input', setVolume);
    volumeBtn.addEventListener('click', toggleMute);
    
    // Close player
    closePlayerBtn.addEventListener('click', closePlayer);

    // Audio element events
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', updateDuration);
    audioElement.addEventListener('ended', handleEpisodeEnd);
    audioElement.addEventListener('play', () => updatePlayState(true));
    audioElement.addEventListener('pause', () => updatePlayState(false));
    audioElement.addEventListener('waiting', () => showLoading(true));
    audioElement.addEventListener('canplay', () => showLoading(false));
}

// Show/Hide Loading
function showLoading(show) {
    if (show) {
        loadingEl.classList.remove('hidden');
    } else {
        loadingEl.classList.add('hidden');
    }
}

// Navigation
function showLandingPage() {
    podcastPage.classList.remove('active');
    landingPage.classList.add('active');
}

function showPodcastPage() {
    landingPage.classList.remove('active');
    podcastPage.classList.add('active');
}

// Fetch feed - try server first, then external proxies
async function fetchFeed(feedId) {
    // Try server API first (faster due to caching)
    if (USE_SERVER_PROXY) {
        try {
            const response = await fetch(`/api/feed/${feedId}`);
            if (response.ok) {
                console.log('Feed loaded from server cache');
                return await response.text();
            }
        } catch (error) {
            console.warn('Server proxy failed, trying external proxies...');
        }
    }
    
    // Fallback to external CORS proxies
    const feed = FEEDS[feedId];
    let lastError;
    
    for (const proxy of CORS_PROXIES) {
        try {
            const response = await fetch(proxy + encodeURIComponent(feed.url), {
                headers: {
                    'Accept': 'application/xml, text/xml, */*'
                }
            });
            
            if (response.ok) {
                console.log(`Feed loaded via proxy: ${proxy}`);
                return await response.text();
            }
        } catch (error) {
            lastError = error;
            console.warn(`Proxy ${proxy} failed, trying next...`);
        }
    }
    
    throw lastError || new Error('All proxies failed');
}

// Load Podcast Feed
async function loadPodcast(feedId) {
    showLoading(true);
    
    try {
        const feed = FEEDS[feedId];
        const xmlText = await fetchFeed(feedId);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Check for parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
            throw new Error('Failed to parse feed XML');
        }
        
        // Parse feed data
        const channel = xmlDoc.querySelector('channel');
        const title = getTextContent(channel, 'title');
        const description = cleanDescription(getTextContent(channel, 'description'));
        const image = channel.querySelector('itunes\\:image, image url')?.getAttribute('href') || 
                      channel.querySelector('image url')?.textContent || '';
        
        // Parse external links
        const fundingEl = channel.querySelector('podcast\\:funding');
        const fundingUrl = fundingEl?.getAttribute('url') || '';
        const fundingText = fundingEl?.textContent || 'Support';
        const podcastLink = getTextContent(channel, 'link');
        
        // Parse episodes (limit to 50 most recent for performance)
        const items = channel.querySelectorAll('item');
        const maxEpisodes = 50;
        const itemsArray = Array.from(items).slice(0, maxEpisodes);
        currentEpisodes = itemsArray.map((item, index) => ({
            index,
            title: getTextContent(item, 'title'),
            description: cleanDescription(getTextContent(item, 'description')),
            audioUrl: item.querySelector('enclosure')?.getAttribute('url') || '',
            duration: formatDuration(getTextContent(item, 'itunes\\:duration')),
            pubDate: formatDate(getTextContent(item, 'pubDate')),
            image: item.querySelector('itunes\\:image')?.getAttribute('href') || image
        }));
        
        currentFeed = {
            id: feedId,
            title,
            description,
            image,
            name: feed.name,
            fundingUrl,
            fundingText,
            podcastLink
        };
        
        // Update UI
        podcastCoverImg.src = image;
        podcastTitle.textContent = title;
        podcastDescription.textContent = description;
        episodeCount.textContent = `${currentEpisodes.length} episodes`;
        
        // Render external links
        renderExternalLinks();
        
        renderEpisodes();
        showPodcastPage();
        
    } catch (error) {
        console.error('Error loading feed:', error);
        alert('Failed to load podcast feed. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Render External Links
function renderExternalLinks() {
    const container = document.getElementById('external-links');
    if (!container || !currentFeed) return;
    
    let html = '';
    
    // Support/PayPal button
    if (currentFeed.fundingUrl) {
        html += `
            <a href="${currentFeed.fundingUrl}" target="_blank" rel="noopener noreferrer" class="external-link-btn support-btn">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                </svg>
                ${currentFeed.fundingText}
            </a>
        `;
    }
    
    // RSS.com podcast page - Listen on other platforms link
    if (currentFeed.podcastLink) {
        html += `
            <a href="${currentFeed.podcastLink}" target="_blank" rel="noopener noreferrer" class="external-link-btn podcast-page-btn">
                <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M10,17L15,12L10,7V17Z"/>
                </svg>
                Listen on Other Platforms
            </a>
        `;
    }
    
    container.innerHTML = html;
}

// Render Episodes List
function renderEpisodes() {
    episodesList.innerHTML = currentEpisodes.map((episode, index) => `
        <div class="episode-item ${currentEpisodeIndex === index ? 'playing' : ''}" data-index="${index}">
            <div class="episode-cover">
                <img src="${episode.image}" alt="${episode.title}" loading="lazy">
            </div>
            <div class="episode-info">
                <h3>${episode.title}</h3>
                <p>
                    <span>${episode.pubDate}</span>
                    <span>${episode.duration}</span>
                </p>
            </div>
            <button class="episode-play-btn" data-index="${index}">
                ${currentEpisodeIndex === index && isPlaying ? 
                    '<span class="pause-icon">❚❚</span>' : 
                    '<span class="play-icon">▶</span>'
                }
            </button>
        </div>
    `).join('');
    
    // Add click listeners to episode items
    document.querySelectorAll('.episode-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.episode-play-btn')) {
                const index = parseInt(item.dataset.index);
                playEpisode(index);
            }
        });
    });
    
    // Add click listeners to play buttons
    document.querySelectorAll('.episode-play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            if (currentEpisodeIndex === index && isPlaying) {
                audioElement.pause();
            } else {
                playEpisode(index);
            }
        });
    });
}

// Play Episode
function playEpisode(index) {
    const episode = currentEpisodes[index];
    if (!episode || !episode.audioUrl) return;
    
    currentEpisodeIndex = index;
    
    // Update player UI
    playerCover.src = episode.image;
    playerTitle.textContent = episode.title;
    playerPodcast.textContent = currentFeed.name;
    
    // Load and play audio
    audioElement.src = episode.audioUrl;
    audioElement.play().catch(err => {
        console.error('Error playing audio:', err);
    });
    
    // Show player
    audioPlayer.classList.remove('hidden');
    
    // Update episode list UI
    renderEpisodes();
}

// Toggle Play/Pause
function togglePlayPause() {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

// Update Play State UI
function updatePlayState(playing) {
    isPlaying = playing;
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    
    if (playing) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
    
    // Update episode list buttons
    renderEpisodes();
}

// Progress Controls
function updateProgress() {
    if (audioElement.duration) {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = percent;
        currentTimeEl.textContent = formatTime(audioElement.currentTime);
    }
}

function updateDuration() {
    durationEl.textContent = formatTime(audioElement.duration);
}

function seekTo() {
    const time = (progressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = time;
}

function seekRelative(seconds) {
    audioElement.currentTime = Math.max(0, Math.min(audioElement.duration, audioElement.currentTime + seconds));
}

// Volume Controls
function setVolume() {
    audioElement.volume = volumeSlider.value / 100;
    updateVolumeIcon();
}

function toggleMute() {
    audioElement.muted = !audioElement.muted;
    updateVolumeIcon();
}

function updateVolumeIcon() {
    const icon = document.getElementById('volume-icon');
    const isMuted = audioElement.muted || audioElement.volume === 0;
    
    if (isMuted) {
        icon.innerHTML = '<path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/>';
    } else if (audioElement.volume < 0.5) {
        icon.innerHTML = '<path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"/>';
    } else {
        icon.innerHTML = '<path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>';
    }
}

// Close Player
function closePlayer() {
    audioElement.pause();
    audioPlayer.classList.add('hidden');
    currentEpisodeIndex = -1;
    renderEpisodes();
}

// Handle Episode End
function handleEpisodeEnd() {
    // Auto-play next episode
    if (currentEpisodeIndex < currentEpisodes.length - 1) {
        playEpisode(currentEpisodeIndex + 1);
    }
}

// Utility Functions
function getTextContent(parent, selector) {
    const el = parent.querySelector(selector);
    return el ? el.textContent.trim() : '';
}

function cleanDescription(html) {
    // Remove HTML tags and clean up the description
    const temp = document.createElement('div');
    temp.innerHTML = html;
    let text = temp.textContent || temp.innerText || '';
    // Truncate if too long
    if (text.length > 300) {
        text = text.substring(0, 300) + '...';
    }
    return text;
}

function formatDuration(duration) {
    if (!duration) return '';
    
    // Handle seconds (integer)
    if (/^\d+$/.test(duration)) {
        const secs = parseInt(duration);
        const hours = Math.floor(secs / 3600);
        const mins = Math.floor((secs % 3600) / 60);
        const seconds = secs % 60;
        
        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${mins}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Already formatted (HH:MM:SS or MM:SS)
    return duration;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Only handle shortcuts when player is visible
    if (audioPlayer.classList.contains('hidden')) return;
    
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            seekRelative(-10);
            break;
        case 'ArrowRight':
            e.preventDefault();
            seekRelative(10);
            break;
        case 'ArrowUp':
            e.preventDefault();
            volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
            setVolume();
            break;
        case 'ArrowDown':
            e.preventDefault();
            volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
            setVolume();
            break;
        case 'KeyM':
            toggleMute();
            break;
    }
});
