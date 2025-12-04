# DJ Lee Romang - Club Vibez Website Documentation

## Overview

This is a one-page podcast website for DJ Lee Romang that aggregates and streams two podcast feeds. The website allows visitors to browse episodes from two different podcasts and play them directly in the browser with a built-in audio player.

---

## Podcasts

### 1. Club Vibez Gym Mix
- **Feed URL:** https://media.rss.com/club-vibez-mini-mix/feed.xml
- **Description:** Need some pumping tunes to keep you energised for the gym session or run! 30 minute mixes packed with the best house and tech house tracks.
- **Duration:** ~30 minutes per episode
- **Episode Count:** 42+ episodes
- **Cover Image:** https://media.rss.com/club-vibez-mini-mix/20250823_070858_981e93ab8050dc56a8e4c508a932998b.jpg

### 2. Club Vibez
- **Feed URL:** https://media.rss.com/club-vibez/feed.xml
- **Description:** 2 hours of the hottest underground dance music featuring Funky House, Tech House, Electro Pop, Deep House, Trance, and beyond.
- **Duration:** 1-2 hours per episode
- **Episode Count:** 50+ episodes
- **Cover Image:** https://media.rss.com/club-vibez/20251004_121037_0ed83f5052afff829bf8e4bd036bb699.png

---

## Application Architecture

### File Structure

```
djleeromang.com/
├── index.html          # Main HTML page
├── styles.css          # All CSS styles
├── app.js              # JavaScript application logic
├── server.js           # Node.js static file server
├── package.json        # Node.js project configuration
├── nixpacks.toml       # Nixpacks deployment config
├── .gitignore          # Git ignore rules
├── README.md           # Quick start guide
└── DOCUMENTATION.md    # This file
```

### Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Server | Node.js (no framework, pure http module) |
| Styling | Custom CSS with CSS Variables |
| Fonts | Google Fonts (Montserrat) |
| Deployment | Nixpacks on Coolify |

---

## Features

### 1. Landing Page
- DJ name and tagline header with gradient styling
- Two podcast cards showing cover art
- Hover effects with play icon overlay
- Linktree social link button
- Animated background gradient

### 2. Podcast Page
- Back button to return to landing
- Large podcast cover image with glow effect
- Podcast title and description
- Episode count display
- Scrollable list of all episodes
- Each episode shows:
  - Episode cover art
  - Episode title
  - Publication date
  - Duration
  - Play button

### 3. Audio Player
- Fixed position at bottom of screen
- Displays current episode info:
  - Cover image
  - Episode title
  - Podcast name
- Playback controls:
  - Play/Pause button
  - Rewind 15 seconds
  - Forward 15 seconds
- Progress bar with time display
- Volume slider
- Mute button
- Close button

### 4. Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Space | Play/Pause |
| Left Arrow | Seek back 10s |
| Right Arrow | Seek forward 10s |
| Up Arrow | Volume up |
| Down Arrow | Volume down |
| M | Toggle mute |

---

## CSS Design System

### Color Palette

```css
--primary-color: #ff2d55;        /* Pink/Red accent */
--primary-dark: #d41442;         /* Darker pink */
--secondary-color: #5856d6;      /* Purple accent */
--background-dark: #0a0a0f;      /* Main background */
--background-card: #141419;      /* Card backgrounds */
--background-player: #1c1c24;    /* Player background */
--text-primary: #ffffff;         /* Primary text */
--text-secondary: #a0a0a8;       /* Secondary text */
--border-color: #2a2a35;         /* Borders */
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #ff2d55 0%, #5856d6 100%);
--gradient-dark: linear-gradient(180deg, #0a0a0f 0%, #151520 100%);
```

### Responsive Breakpoints
- Desktop: > 768px
- Tablet: 481px - 768px  
- Mobile: < 480px

---

## JavaScript Application

### State Management

```javascript
let currentFeed = null;           // Current podcast data
let currentEpisodes = [];         // Array of episode objects
let currentEpisodeIndex = -1;     // Currently playing episode
let isPlaying = false;            // Playback state
```

### Episode Object Structure

```javascript
{
  index: 0,                        // Episode index
  title: "Episode Title",          // From <title>
  description: "Description...",   // From <description>
  audioUrl: "https://...",         // From <enclosure url>
  duration: "32:24",               // From <itunes:duration>
  pubDate: "Nov 29, 2025",         // From <pubDate>
  image: "https://..."             // From <itunes:image>
}
```

### CORS Proxy

RSS feeds are fetched through a CORS proxy to avoid cross-origin issues:

```javascript
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
```

### Key Functions

| Function | Description |
|----------|-------------|
| `loadPodcast(feedId)` | Fetches and parses RSS feed |
| `renderEpisodes()` | Renders episode list HTML |
| `playEpisode(index)` | Loads and plays an episode |
| `togglePlayPause()` | Play/pause toggle |
| `seekRelative(seconds)` | Seek forward/backward |
| `setVolume()` | Update audio volume |
| `formatTime(seconds)` | Format seconds to MM:SS |
| `formatDate(dateStr)` | Format date for display |

---

## Server Configuration

### Node.js Server (server.js)

- Pure Node.js HTTP server (no Express needed)
- Serves static files from project root
- MIME type detection for all common file types
- Cache headers for static assets
- Fallback to index.html for SPA routing
- Security check to prevent directory traversal

### Supported MIME Types

```javascript
'.html': 'text/html',
'.css': 'text/css',
'.js': 'text/javascript',
'.json': 'application/json',
'.png': 'image/png',
'.jpg': 'image/jpeg',
'.svg': 'image/svg+xml',
'.woff': 'font/woff',
'.woff2': 'font/woff2'
```

---

## Deployment

### Coolify with Nixpacks

1. **Prerequisites:**
   - Coolify instance running
   - Git repository with the code

2. **Nixpacks Configuration (nixpacks.toml):**
   ```toml
   [phases.setup]
   nixPkgs = ["nodejs_20"]

   [phases.install]
   cmds = ["npm install --production"]

   [start]
   cmd = "npm start"

   [variables]
   NODE_ENV = "production"
   ```

3. **Coolify Settings:**
   - Build Pack: Nixpacks (auto-detected)
   - Port: 3000 (auto-configured by Coolify)

4. **Environment Variables:**
   - `PORT` - Server port (default: 3000)
   - `NODE_ENV` - Environment (production/development)

### Local Development

```bash
# Clone repository
git clone <repo-url>
cd djleeromang.com

# Start server
npm start

# Open browser
http://localhost:3000
```

---

## RSS Feed Structure

### Channel Information

```xml
<channel>
  <title>Podcast Title</title>
  <description>Podcast description HTML</description>
  <itunes:image href="cover-image-url"/>
  <itunes:author>DJ Lee Romang</itunes:author>
</channel>
```

### Episode Information

```xml
<item>
  <title>Episode Title</title>
  <description>Episode description HTML</description>
  <enclosure url="audio-file.mp3" type="audio/mpeg"/>
  <itunes:duration>1944</itunes:duration>
  <pubDate>Sat, 29 Nov 2025 10:57:22 GMT</pubDate>
  <itunes:image href="episode-cover-url"/>
</item>
```

---

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Required Browser APIs
- Fetch API
- DOMParser
- Audio Element
- CSS Custom Properties
- CSS Grid/Flexbox

---

## Performance Considerations

1. **Lazy Loading:** Episode images use `loading="lazy"`
2. **Caching:** Static assets cached for 1 year
3. **No Framework:** Pure JS means small bundle size
4. **CSS Animations:** Hardware-accelerated transforms
5. **Efficient DOM Updates:** Only re-render episode list when needed

---

## Future Enhancements

Potential improvements for future versions:

- [ ] Episode search functionality
- [ ] Download episode option
- [ ] Share episode links
- [ ] Remember playback position
- [ ] Playlist/queue feature
- [ ] Dark/Light theme toggle
- [ ] PWA support for offline playback
- [ ] Analytics integration

---

## Links & Resources

- **DJ Lee Romang Linktree:** https://linktr.ee/djleeromang
- **Club Vibez Gym Mix:** https://rss.com/podcasts/club-vibez-mini-mix/
- **Club Vibez:** https://rss.com/podcasts/club-vibez/
- **Support:** https://www.paypal.me/leeromang

---

## License

MIT License - © Lee Romang 2024

---

*Documentation last updated: December 2024*
