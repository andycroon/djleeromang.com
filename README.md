# DJ Lee Romang - Club Vibez Website

A one-page podcast website for DJ Lee Romang featuring two podcasts:
- **Club Vibez Gym Mix** - 30 minute workout mixes
- **Club Vibez** - 2 hours of the hottest underground dance music

## Features

- 🎧 Stream episodes directly in the browser
- 🎨 Modern, responsive design with dark theme
- ▶️ Built-in audio player with play/pause, progress bar, and volume control
- ⌨️ Keyboard shortcuts (Space: play/pause, Arrow keys: seek/volume, M: mute)
- 📱 Mobile-friendly design
- 🔄 Auto-fetches latest episodes from RSS feeds

## Tech Stack

- Pure HTML, CSS, and JavaScript (no frameworks)
- Node.js server for static file serving
- RSS feed parsing with CORS proxy

## Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd djleeromang.com
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open http://localhost:3000 in your browser

## Deployment on Coolify with Nixpacks

This project is configured for easy deployment on Coolify using Nixpacks.

### Steps:

1. **Push to Git Repository**
   Push this code to a Git repository (GitHub, GitLab, etc.)

2. **Create New Application in Coolify**
   - Go to your Coolify dashboard
   - Click "New Resource" → "Application"
   - Select your Git repository

3. **Configure Build Settings**
   - Build Pack: **Nixpacks** (should auto-detect)
   - Port: **3000**

4. **Environment Variables** (optional)
   - `PORT`: Default is 3000, Coolify will override this automatically

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your site will be available at the assigned domain

### Configuration Files

- `nixpacks.toml` - Nixpacks build configuration
- `package.json` - Node.js project configuration
- `server.js` - Static file server

## RSS Feeds

The website fetches podcast data from these RSS feeds:
- Club Vibez Gym Mix: https://media.rss.com/club-vibez-mini-mix/feed.xml
- Club Vibez: https://media.rss.com/club-vibez/feed.xml

## License

MIT License - © Lee Romang 2024

## Links

- [DJ Lee Romang Linktree](https://linktr.ee/djleeromang)
- [Club Vibez Gym Mix Podcast](https://rss.com/podcasts/club-vibez-mini-mix/)
- [Club Vibez Podcast](https://rss.com/podcasts/club-vibez/)
