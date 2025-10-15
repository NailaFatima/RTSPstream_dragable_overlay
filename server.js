const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;


const allowedOrigins = [
  "http://localhost:3001", // ✅ Local dev
  "https://myportfolio-frontend.vercel.app" // ✅ Your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true,
}));


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/streamview', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => {
  console.log('MongoDB connection failed, using in-memory storage for development');
  console.log('To use MongoDB, please start MongoDB service or set MONGODB_URI environment variable');
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.log('MongoDB connection error:', err.message);
  console.log('Continuing with in-memory storage...');
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Overlay Schema
const overlaySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  size: {
    width: { type: Number, default: 200 },
    height: { type: Number, default: 50 }
  },
  style: {
    fontSize: { type: Number, default: 16 },
    color: { type: String, default: '#ffffff' },
    backgroundColor: { type: String, default: 'transparent' },
    opacity: { type: Number, default: 1 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Overlay = mongoose.model('Overlay', overlaySchema);

// In-memory storage fallback
let inMemoryOverlays = [];
let nextId = 1;

// API Routes

// Get all overlays
app.get('/api/overlays', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const overlays = await Overlay.find().sort({ createdAt: -1 });
      res.json(overlays);
    } else {
      res.json(inMemoryOverlays);
    }
  } catch (error) {
    console.log('Using in-memory storage for overlays');
    res.json(inMemoryOverlays);
  }
});

// Create new overlay
app.post('/api/overlays', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const overlay = new Overlay(req.body);
      await overlay.save();
      res.status(201).json(overlay);
    } else {
      const newOverlay = { ...req.body, _id: nextId++, createdAt: new Date(), updatedAt: new Date() };
      inMemoryOverlays.push(newOverlay);
      res.status(201).json(newOverlay);
    }
  } catch (error) {
    console.log('Using in-memory storage for overlay creation');
    const newOverlay = { ...req.body, _id: nextId++, createdAt: new Date(), updatedAt: new Date() };
    inMemoryOverlays.push(newOverlay);
    res.status(201).json(newOverlay);
  }
});

// Update overlay
app.put('/api/overlays/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const overlay = await Overlay.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (!overlay) {
        return res.status(404).json({ error: 'Overlay not found' });
      }
      res.json(overlay);
    } else {
      const id = parseInt(req.params.id);
      const index = inMemoryOverlays.findIndex(overlay => overlay._id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Overlay not found' });
      }
      inMemoryOverlays[index] = { ...inMemoryOverlays[index], ...req.body, updatedAt: new Date() };
      res.json(inMemoryOverlays[index]);
    }
  } catch (error) {
    console.log('Using in-memory storage for overlay update');
    const id = parseInt(req.params.id);
    const index = inMemoryOverlays.findIndex(overlay => overlay._id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Overlay not found' });
    }
    inMemoryOverlays[index] = { ...inMemoryOverlays[index], ...req.body, updatedAt: new Date() };
    res.json(inMemoryOverlays[index]);
  }
});

// Delete overlay
app.delete('/api/overlays/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const overlay = await Overlay.findByIdAndDelete(req.params.id);
      if (!overlay) {
        return res.status(404).json({ error: 'Overlay not found' });
      }
      res.json({ message: 'Overlay deleted successfully' });
    } else {
      const id = parseInt(req.params.id);
      const index = inMemoryOverlays.findIndex(overlay => overlay._id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Overlay not found' });
      }
      inMemoryOverlays.splice(index, 1);
      res.json({ message: 'Overlay deleted successfully' });
    }
  } catch (error) {
    console.log('Using in-memory storage for overlay deletion');
    const id = parseInt(req.params.id);
    const index = inMemoryOverlays.findIndex(overlay => overlay._id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Overlay not found' });
    }
    inMemoryOverlays.splice(index, 1);
    res.json({ message: 'Overlay deleted successfully' });
  }
});

// Get single overlay
app.get('/api/overlays/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const overlay = await Overlay.findById(req.params.id);
      if (!overlay) {
        return res.status(404).json({ error: 'Overlay not found' });
      }
      res.json(overlay);
    } else {
      const id = parseInt(req.params.id);
      const overlay = inMemoryOverlays.find(overlay => overlay._id === id);
      if (!overlay) {
        return res.status(404).json({ error: 'Overlay not found' });
      }
      res.json(overlay);
    }
  } catch (error) {
    console.log('Using in-memory storage for single overlay fetch');
    const id = parseInt(req.params.id);
    const overlay = inMemoryOverlays.find(overlay => overlay._id === id);
    if (!overlay) {
      return res.status(404).json({ error: 'Overlay not found' });
    }
    res.json(overlay);
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// app.listen(PORT, (err) => {
//   if (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Frontend will be available at http://localhost:3000`);
//   console.log(`API will be available at http://localhost:${PORT}`);
// });
module.exports = app;
