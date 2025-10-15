# 🚀 StreamView - Quick Start Guide

## ✅ All Issues Fixed!

The application is now fully functional with:
- ✅ Fixed port conflicts (using ports 3000 and 5001)
- ✅ Database setup with SQLite (no MongoDB required)
- ✅ CRUD functionality working
- ✅ Overlay management as side panel
- ✅ ESLint warnings resolved

## 🎯 Quick Start (3 Easy Steps)

### Option 1: Automatic Setup (Recommended)
```bash
# Windows
start.bat

# macOS/Linux
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
npm install

# 2. Setup database
npm run setup-db

# 3. Start application
npm run dev:full
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Test**: http://localhost:5001/api/overlays

## 🎨 How to Use

1. **Open the app** at http://localhost:3000
2. **Enter RTSP URL** (or use placeholder for testing)
3. **Click "🎨 Overlays"** button in video controls
4. **Add overlays** using the side panel:
   - Click "➕ Add Overlay"
   - Choose text or image
   - Customize position, size, and style
   - Save and see it on your stream!

## 📊 Database Options

### 1. SQLite (Default - No Setup Required)
- ✅ Already configured
- ✅ Database file: `streamview.db`
- ✅ Sample data included
- ✅ Perfect for development

### 2. MongoDB (Optional)
- See `DATABASE_SETUP.md` for full instructions
- Requires MongoDB installation
- Better for production use

### 3. In-Memory (Fallback)
- Works without any database
- Data lost on restart
- Good for quick testing

## 🛠️ Features Working

- ✅ **Video Streaming**: RTSP support with controls
- ✅ **Overlay Management**: Side panel with drag & drop
- ✅ **CRUD Operations**: Create, read, update, delete overlays
- ✅ **Real-time Updates**: Changes saved automatically
- ✅ **Responsive Design**: Works on all devices
- ✅ **Modern UI**: Glassmorphic design with animations

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 3000 and 5001
# Windows
netstat -ano | findstr :3000
taskkill /f /pid [PID]

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Database Issues
- SQLite database is created automatically
- Check `streamview.db` file exists
- Run `npm run setup-db` to recreate

### API Not Working
- Check backend is running on port 5001
- Test: http://localhost:5001/api/overlays
- Should return JSON array

## 📁 Project Structure

```
streamview/
├── server.js              # Express backend
├── setup-database.js      # SQLite setup script
├── streamview.db          # SQLite database (auto-created)
├── start.bat              # Windows startup script
├── start.sh               # macOS/Linux startup script
├── client/                # React frontend
│   ├── src/components/    # React components
│   └── package.json       # Frontend dependencies
├── DATABASE_SETUP.md      # Database setup guide
└── README.md              # Full documentation
```

## 🎉 You're Ready!

The application is now fully functional with:
- **No MongoDB required** (uses SQLite)
- **No port conflicts** (uses 3000/5001)
- **Working CRUD operations**
- **Side panel overlay management**
- **Modern, responsive design**

Just run `start.bat` (Windows) or `./start.sh` (macOS/Linux) and you're good to go! 🚀
