const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Feed cache (10 minute TTL)
const feedCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const ALLOWED_FEEDS = {
    'gym-mix': 'https://media.rss.com/club-vibez-mini-mix/feed.xml',
    'club-vibez': 'https://media.rss.com/club-vibez/feed.xml'
};

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Fetch feed with caching
function fetchFeed(feedId, callback) {
    const url = ALLOWED_FEEDS[feedId];
    if (!url) {
        callback(new Error('Invalid feed ID'));
        return;
    }

    // Check cache
    const cached = feedCache.get(feedId);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`Serving cached feed: ${feedId}`);
        callback(null, cached.data);
        return;
    }

    console.log(`Fetching fresh feed: ${feedId}`);
    
    https.get(url, (response) => {
        let data = '';
        
        response.on('data', chunk => {
            data += chunk;
        });
        
        response.on('end', () => {
            // Cache the response
            feedCache.set(feedId, {
                data: data,
                timestamp: Date.now()
            });
            callback(null, data);
        });
    }).on('error', (err) => {
        // If cached version exists, return it even if expired
        if (cached) {
            console.log(`Feed fetch failed, using stale cache: ${feedId}`);
            callback(null, cached.data);
        } else {
            callback(err);
        }
    });
}

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    // Parse URL
    const urlParts = req.url.split('?');
    let filePath = urlParts[0];
    
    // Handle feed API endpoint
    if (filePath.startsWith('/api/feed/')) {
        const feedId = filePath.replace('/api/feed/', '');
        
        fetchFeed(feedId, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200, { 
                    'Content-Type': 'application/xml',
                    'Cache-Control': 'public, max-age=600',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(data);
            }
        });
        return;
    }
    
    // Default to index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Construct full path
    const fullPath = path.join(__dirname, filePath);
    
    // Security check - prevent directory traversal
    if (!fullPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    // Get file extension and MIME type
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found - serve index.html for SPA routing
                fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 
                            'Content-Type': 'text/html',
                            'Cache-Control': 'no-cache'
                        });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            }
        } else {
            // Set cache headers for static assets
            const cacheControl = ext === '.html' 
                ? 'no-cache' 
                : 'public, max-age=31536000';
            
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': cacheControl
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`DJ Lee Romang website running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
