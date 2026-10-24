const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'links.json');

// Helper to read links
function getLinks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

// Helper to write links
function saveLinks(links) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
}

// Shorten URL API
app.post('/api/shorten', (req, res) => {
  try {
    const { originalUrl, customAlias, userEmail } = req.body;
    if (!originalUrl) return res.status(400).json({ error: 'Original URL is required' });

    let links = getLinks();
    let shortCode = customAlias ? customAlias.trim() : Math.random().toString(36).substring(2, 8);
    
    if (links.some(l => l.shortCode === shortCode)) {
      return res.status(400).json({ error: 'Custom alias already in use' });
    }

    const newLink = {
      _id: Date.now().toString(),
      originalUrl,
      shortCode,
      clicks: 0,
      userEmail: userEmail || 'sumanth@gmail.com',
      createdAt: new Date().toISOString()
    };

    links.unshift(newLink);
    saveLinks(links);
    res.json(newLink);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Get User Links API
app.get('/api/links', (req, res) => {
  try {
    res.json(getLinks());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Analytics API
app.get('/api/analytics/:shortCode', (req, res) => {
  try {
    const links = getLinks();
    const link = links.find(l => l.shortCode === req.params.shortCode);
    if (!link) return res.status(404).json({ error: 'Link not found' });
    res.json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Redirection & Click Tracking
app.get('/:shortCode', (req, res) => {
  try {
    let links = getLinks();
    const link = links.find(l => l.shortCode === req.params.shortCode);
    if (!link) return res.status(404).send('Short link not found');

    link.clicks = (link.clicks || 0) + 1;
    saveLinks(links);

    res.redirect(link.originalUrl);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});