# Database Setup Guide for StreamView

This guide provides instructions for setting up databases for the StreamView application.

## Option 1: MongoDB Setup (Recommended)

### Install MongoDB

#### Windows:
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service
5. Install MongoDB Compass (GUI tool) - optional but recommended

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org
```

### Start MongoDB Service

#### Windows:
- MongoDB should start automatically as a Windows Service
- You can also start it manually: `net start MongoDB`

#### macOS:
```bash
brew services start mongodb/brew/mongodb-community
```

#### Linux:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Start automatically on boot
```

### Verify MongoDB Installation

```bash
# Connect to MongoDB
mongosh

# Or using the legacy mongo client
mongo
```

### Create Database and Collections

```javascript
// Connect to MongoDB shell
mongosh

// Create and use the streamview database
use streamview

// Create the overlays collection
db.createCollection("overlays")

// Insert a sample overlay document
db.overlays.insertOne({
  type: "text",
  content: "Welcome to StreamView!",
  position: { x: 100, y: 100 },
  size: { width: 200, height: 50 },
  style: {
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "transparent",
    opacity: 1
  },
  createdAt: new Date(),
  updatedAt: new Date()
})

// Verify the document was inserted
db.overlays.find().pretty()
```

### Environment Configuration

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/streamview
PORT=5001
NODE_ENV=development
```

## Option 2: SQL Database Setup (Alternative)

If you prefer SQL over MongoDB, here's how to set up with SQLite or PostgreSQL:

### SQLite Setup (Simplest)

1. Install sqlite3:
```bash
npm install sqlite3
```

2. Create database schema:
```sql
-- Create database file: streamview.db
CREATE TABLE overlays (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(10) NOT NULL CHECK (type IN ('text', 'image')),
    content TEXT NOT NULL,
    position_x INTEGER DEFAULT 0,
    position_y INTEGER DEFAULT 0,
    size_width INTEGER DEFAULT 200,
    size_height INTEGER DEFAULT 50,
    style_fontSize INTEGER DEFAULT 16,
    style_color VARCHAR(7) DEFAULT '#ffffff',
    style_backgroundColor VARCHAR(20) DEFAULT 'transparent',
    style_opacity REAL DEFAULT 1.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO overlays (type, content, position_x, position_y, size_width, size_height, style_fontSize, style_color, style_backgroundColor, style_opacity) 
VALUES ('text', 'Welcome to StreamView!', 100, 100, 200, 50, 16, '#ffffff', 'transparent', 1.0);
```

### PostgreSQL Setup

1. Install PostgreSQL: https://www.postgresql.org/download/

2. Create database:
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE streamview;

-- Connect to the database
\c streamview;

-- Create table
CREATE TABLE overlays (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('text', 'image')),
    content TEXT NOT NULL,
    position_x INTEGER DEFAULT 0,
    position_y INTEGER DEFAULT 0,
    size_width INTEGER DEFAULT 200,
    size_height INTEGER DEFAULT 50,
    style_fontSize INTEGER DEFAULT 16,
    style_color VARCHAR(7) DEFAULT '#ffffff',
    style_backgroundColor VARCHAR(20) DEFAULT 'transparent',
    style_opacity REAL DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO overlays (type, content, position_x, position_y, size_width, size_height, style_fontSize, style_color, style_backgroundColor, style_opacity) 
VALUES ('text', 'Welcome to StreamView!', 100, 100, 200, 50, 16, '#ffffff', 'transparent', 1.0);
```

## Option 3: No Database (In-Memory Storage)

The application is configured to work without any database using in-memory storage. This is perfect for development and testing:

- No setup required
- Data is lost when the server restarts
- Perfect for quick testing and development

## Testing Database Connection

### MongoDB Test:
```bash
# Start the application
npm run dev

# Check console output for:
# "Connected to MongoDB" - Success
# "MongoDB connection failed, using in-memory storage" - Fallback mode
```

### API Test:
```bash
# Test the API endpoints
curl http://localhost:5001/api/overlays

# Should return JSON array of overlays
```

## Troubleshooting

### MongoDB Connection Issues:
1. Ensure MongoDB service is running
2. Check if port 27017 is available
3. Verify connection string in .env file
4. Check firewall settings

### Port Conflicts:
- Backend: Change PORT in .env file (default: 5001)
- Frontend: Change port in client/package.json scripts

### Permission Issues:
- Ensure MongoDB has proper permissions
- Check database user permissions
- Verify file system permissions

## Production Considerations

1. **Security**: Use authentication for MongoDB
2. **Backup**: Set up regular database backups
3. **Monitoring**: Monitor database performance
4. **Scaling**: Consider MongoDB Atlas for cloud hosting

## Quick Start (No Database)

If you want to get started immediately without setting up a database:

1. Just run: `npm run dev:full`
2. The app will use in-memory storage
3. All CRUD operations will work
4. Data will persist during the session

This is perfect for development and testing!
