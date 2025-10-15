# StreamView - RTSP Livestream with Overlay Management

A modern, minimalist web application for streaming RTSP video feeds with custom overlay management. Built with Node.js, MongoDB, and React.

## Features

### 🎥 Video Streaming
- RTSP stream support with HTML5 video player
- Play, pause, and volume controls
- Responsive video player with modern UI

### 🎨 Overlay Management
- **Text Overlays**: Customizable text with font size, color, and background
- **Image Overlays**: Support for image URLs with automatic fallback
- **Drag & Drop**: Position overlays anywhere on the video
- **Resizable**: Adjust overlay size with intuitive controls
- **Real-time Updates**: Changes are saved automatically

### 🛠️ CRUD API
- **Create**: Add new overlays with custom properties
- **Read**: Retrieve all saved overlays
- **Update**: Modify existing overlay settings
- **Delete**: Remove overlays you no longer need

### 🎨 Modern Design
- Glassmorphic UI with blur effects
- Responsive design for all devices
- Smooth animations and transitions
- Professional gradient backgrounds

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: React 18
- **Styling**: CSS3 with modern features
- **Drag & Drop**: react-draggable
- **Resizing**: react-resizable

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd streamview
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/streamview
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Run the application**
   
   **Development mode (both frontend and backend):**
   ```bash
   npm run dev:full
   ```
   
   **Or run separately:**
   ```bash
   # Terminal 1 - Backend
   npm run dev
   
   # Terminal 2 - Frontend
   npm run client
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Getting Started

1. **Enter RTSP URL**: On the home page, enter your RTSP stream URL
2. **Add Overlays**: Click "Add Overlay" to create text or image overlays
3. **Customize**: Drag overlays to position them, resize as needed
4. **Save**: All changes are automatically saved to the database

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/overlays` | Get all overlays |
| POST | `/api/overlays` | Create new overlay |
| GET | `/api/overlays/:id` | Get specific overlay |
| PUT | `/api/overlays/:id` | Update overlay |
| DELETE | `/api/overlays/:id` | Delete overlay |

### Overlay Schema

```javascript
{
  type: "text" | "image",
  content: "string",
  position: { x: number, y: number },
  size: { width: number, height: number },
  style: {
    fontSize: number,
    color: string,
    backgroundColor: string,
    opacity: number
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
streamview/
├── server.js              # Express server
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
└── README.md
```

## Components

- **Header**: Navigation with glassmorphic design
- **Hero**: Main video player section
- **VideoPlayer**: RTSP video streaming component
- **OverlayRenderer**: Drag-and-drop overlay system
- **OverlayManager**: CRUD operations for overlays
- **OverlayForm**: Create/edit overlay interface
- **OverlayList**: Display all saved overlays
- **Footer**: Site footer with links

## RTSP Support

The application supports RTSP streams through HTML5 video elements. For production use with RTSP cameras, consider:

- Converting RTSP to HLS using FFmpeg
- Implementing WebRTC for better browser compatibility
- Using a media server like Node Media Server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Check the API documentation in the app
- Review the get started guide

---

**StreamView** - Professional live streaming with custom overlays 🎥✨
