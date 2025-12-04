// RSS Feed URLs with platform links
const FEEDS = {
    'gym-mix': {
        url: 'https://media.rss.com/club-vibez-mini-mix/feed.xml',
        name: 'Club Vibez Gym Mix',
        platforms: {
            apple: 'https://podcasts.apple.com/podcast/club-vibez-gym-mix-dj-lee-romang/id1779313632',
            spotify: 'https://open.spotify.com/show/3rJLXGKNQQX3bpxRJN2Xaj',
            amazon: 'https://music.amazon.com/podcasts/c3e24ee9-a35f-46f6-a8b9-ff0b52fad03f/club-vibez-gym-mix---dj-lee-romang',
            deezer: 'https://www.deezer.com/show/1001122261',
            youtube: 'https://www.youtube.com/playlist?list=PLiR6J-aKkc5FHaWzz_H_C4Fxs_07-yl8H'
        }
    },
    'club-vibez': {
        url: 'https://media.rss.com/club-vibez/feed.xml',
        name: 'Club Vibez',
        platforms: {
            apple: 'https://podcasts.apple.com/podcast/club-vibez-mixed-by-lee-romang/id1779313775',
            spotify: 'https://open.spotify.com/show/47VOLqhPFbJAwFu1d4xz4T',
            amazon: 'https://music.amazon.com/podcasts/eca8a730-2f4d-4ccc-86fd-2e87e26ec62a/club-vibez---mixed-by-lee-romang',
            deezer: 'https://www.deezer.com/show/1001122521',
            youtube: 'https://www.youtube.com/playlist?list=PLiR6J-aKkc5Fg5x4yw1M_u5p-9qzFXdGT'
        }
    }
};

// Platform icons (SVG paths)
const PLATFORM_ICONS = {
    apple: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>',
    spotify: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.348-1.435-5.304-1.76-8.785-.964-.335.077-.67-.133-.746-.469-.077-.335.132-.67.468-.746 3.809-.87 7.077-.496 9.713 1.115.293.18.386.563.207.857zm1.223-2.723c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.13-9.965-1.166-.413.125-.848-.106-.973-.517-.125-.413.108-.848.518-.973 3.632-1.102 8.147-.568 11.234 1.328.366.226.48.707.258 1.071zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.493.149-1.016-.128-1.166-.622-.148-.494.129-1.015.623-1.164 3.532-1.073 9.404-.866 13.115 1.337.445.264.59.838.327 1.282-.264.443-.838.59-1.282.325z"/></svg>',
    amazon: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M15.93 17.09c-.18.16-.43.17-.63.06-.89-.74-1.05-1.08-1.54-1.79-1.47 1.5-2.51 1.95-4.42 1.95-2.25 0-4.01-1.39-4.01-4.17 0-2.18 1.17-3.64 2.86-4.38 1.46-.64 3.49-.76 5.04-.93v-.35c0-.65.05-1.41-.33-1.97-.33-.5-.97-.71-1.53-.71-1.04 0-1.97.54-2.2 1.65-.05.24-.22.47-.47.48l-2.6-.28c-.22-.05-.46-.22-.4-.54.6-3.15 3.45-4.1 6-4.1 1.3 0 3 .35 4.03 1.33C17.11 4.55 17 6.18 17 7.95v4.17c0 1.25.52 1.8 1.01 2.48.17.24.21.54 0 .71l-2.06 1.78h-.02zM14.5 10.31v-.6c-1.93 0-3.97.41-3.97 2.67 0 1.16.6 1.94 1.63 1.94 1.14 0 2.08-.91 2.34-1.9v-2.11z"/></svg>',
    deezer: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M18.81 4.16v3.03H24V4.16zM6.27 8.38v3.027h5.189V8.38zm12.54 0v3.027H24V8.38zM6.27 12.566v3.027h5.189v-3.027zm6.271 0v3.027h5.19v-3.027zm6.27 0v3.027H24v-3.027zM0 16.752v3.027h5.19v-3.027zm6.27 0v3.027h5.189v-3.027zm6.271 0v3.027h5.19v-3.027zm6.27 0v3.027H24v-3.027z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>'
};

// Multiple CORS Proxies for fallback
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

// Fetch with fallback proxies
async function fetchWithFallback(url) {
    let lastError;
    
    for (const proxy of CORS_PROXIES) {
        try {
            const response = await fetch(proxy + encodeURIComponent(url), {
                headers: {
                    'Accept': 'application/xml, text/xml, */*'
                }
            });
            
            if (response.ok) {
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
        const xmlText = await fetchWithFallback(feed.url);
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
        
        // Parse episodes
        const items = channel.querySelectorAll('item');
        currentEpisodes = Array.from(items).map((item, index) => ({
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
    
    const feed = FEEDS[currentFeed.id];
    const platformNames = {
        apple: 'Apple Podcasts',
        spotify: 'Spotify',
        amazon: 'Amazon Music',
        deezer: 'Deezer',
        youtube: 'YouTube'
    };
    
    let html = '<div class="links-row">';
    
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
    
    html += '</div>';
    
    // Listen on platforms section
    if (feed && feed.platforms) {
        html += '<div class="listen-on-section"><span class="listen-label">Listen on:</span><div class="platform-links">';
        
        for (const [platform, url] of Object.entries(feed.platforms)) {
            if (url && PLATFORM_ICONS[platform]) {
                html += `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="platform-btn platform-${platform}" title="${platformNames[platform] || platform}">
                        ${PLATFORM_ICONS[platform]}
                    </a>
                `;
            }
        }
        
        html += '</div></div>';
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
