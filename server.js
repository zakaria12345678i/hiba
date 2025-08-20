const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const WISHES_FILE = path.join(__dirname, 'wishes.json');

// Initialize wishes file if it doesn't exist
async function initializeWishesFile() {
  try {
    await fs.access(WISHES_FILE);
  } catch {
    await fs.writeFile(WISHES_FILE, JSON.stringify([]));
  }
}

// Get all wishes
app.get('/api/wishes', async (req, res) => {
  try {
    const data = await fs.readFile(WISHES_FILE, 'utf8');
    const wishes = JSON.parse(data);
    res.json(wishes);
  } catch (error) {
    console.error('Error reading wishes:', error);
    res.status(500).json({ error: 'Failed to read wishes' });
  }
});

// Save a new wish
app.post('/api/wishes', async (req, res) => {
  try {
    const { text, timestamp, id } = req.body;
    
    if (!text || !timestamp) {
      return res.status(400).json({ error: 'Text and timestamp are required' });
    }

    const data = await fs.readFile(WISHES_FILE, 'utf8');
    const wishes = JSON.parse(data);
    
    const newWish = {
      text: text.trim(),
      timestamp,
      id: id || Date.now(),
      from: req.headers['x-user-agent'] || 'Unknown'
    };
    
    wishes.push(newWish);
    await fs.writeFile(WISHES_FILE, JSON.stringify(wishes, null, 2));
    
    console.log('🎂 New wish saved:', newWish);
    res.json({ success: true, wish: newWish });
  } catch (error) {
    console.error('Error saving wish:', error);
    res.status(500).json({ error: 'Failed to save wish' });
  }
});

// Admin endpoint to view all wishes (you can access this from your laptop)
app.get('/admin/wishes', async (req, res) => {
  try {
    const data = await fs.readFile(WISHES_FILE, 'utf8');
    const wishes = JSON.parse(data);
    
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Birthday Wishes Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
          .wish { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .timestamp { color: #666; font-size: 12px; }
          .text { font-size: 16px; margin: 8px 0; }
          .from { color: #888; font-size: 12px; }
          h1 { color: #333; }
          .stats { background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>🎂 Birthday Wishes Dashboard</h1>
        <div class="stats">
          <h3>📊 Statistics</h3>
          <p>Total Wishes: ${wishes.length}</p>
          <p>Last Updated: ${new Date().toLocaleString()}</p>
        </div>
        <h2>💝 All Wishes:</h2>
    `;
    
    if (wishes.length === 0) {
      html += '<p>No wishes yet! 🥺</p>';
    } else {
      wishes.forEach((wish, index) => {
        html += `
          <div class="wish">
            <div class="timestamp">⏰ ${wish.timestamp}</div>
            <div class="text">💭 "${wish.text}"</div>
            <div class="from">📱 From: ${wish.from}</div>
          </div>
        `;
      });
    }
    
    html += `
        <script>
          // Auto-refresh every 30 seconds
          setTimeout(() => location.reload(), 30000);
        </script>
      </body>
      </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Error reading wishes:', error);
    res.status(500).send('Failed to read wishes');
  }
});

// Start server
async function startServer() {
  await initializeWishesFile();
  app.listen(PORT, () => {
    console.log(`🎂 Birthday Wishes Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin/wishes`);
    console.log(`🔌 API Endpoints:`);
    console.log(`   GET  /api/wishes - Get all wishes`);
    console.log(`   POST /api/wishes - Save a new wish`);
  });
}

startServer();
