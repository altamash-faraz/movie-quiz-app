# Installation Commands - Movie Quiz App

## Quick Installation (Copy & Paste)

### 1. Install Backend Dependencies

```powershell
cd "d:\Projects\Movie Quiz app\backend"
npm install
```

### 2. Install Frontend Dependencies

```powershell
cd "d:\Projects\Movie Quiz app\frontend"
npm install
```

### 3. Setup Backend Environment

```powershell
cd "d:\Projects\Movie Quiz app\backend"
Copy-Item .env.example .env
```

Then edit `.env` file and add:
- Your MongoDB connection string
- Your TMDb API key
- A secure JWT secret

### 4. Setup Frontend Environment

```powershell
cd "d:\Projects\Movie Quiz app\frontend"
Copy-Item .env.local.example .env.local
```

### 5. Start Backend Server (Terminal 1)

```powershell
cd "d:\Projects\Movie Quiz app\backend"
npm run dev
```

### 6. Start Frontend Server (Terminal 2)

```powershell
cd "d:\Projects\Movie Quiz app\frontend"
npm run dev
```

### 7. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health

## TMDb API Key Setup

1. Go to: https://www.themoviedb.org/
2. Sign up for free
3. Go to Settings → API
4. Request API key (choose "Developer")
5. Copy the API key
6. Add to `backend/.env` as `TMDB_API_KEY=your_key_here`

## MongoDB Setup

### Option 1: Local MongoDB
```powershell
# Install MongoDB from: https://www.mongodb.com/try/download/community
# Then start MongoDB service
net start MongoDB
```

### Option 2: MongoDB Atlas (Cloud - Free)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

## Verify Installation

### Check Backend
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET
```

Expected response:
```json
{
  "status": "OK",
  "message": "Movie Quiz API is running",
  "timestamp": "2025-10-21T..."
}
```

### Check Frontend
Open browser: http://localhost:3000

You should see the Movie Quiz homepage.

## Troubleshooting

### If backend port 5000 is in use:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

### If frontend port 3000 is in use:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

### If MongoDB connection fails:
Try using: `mongodb://127.0.0.1:27017/movie-quiz-db` instead of `localhost`

### Clear node_modules and reinstall:
```powershell
# Backend
cd "d:\Projects\Movie Quiz app\backend"
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install

# Frontend
cd "d:\Projects\Movie Quiz app\frontend"
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

## Project Status Check

Run these commands to verify everything is set up:

```powershell
# Check Node.js version (should be v18+)
node --version

# Check npm version
npm --version

# Check if MongoDB is running (if using local)
Get-Service -Name MongoDB -ErrorAction SilentlyContinue

# List backend dependencies
cd "d:\Projects\Movie Quiz app\backend"
npm list --depth=0

# List frontend dependencies
cd "d:\Projects\Movie Quiz app\frontend"
npm list --depth=0
```

## Next Steps

After successful installation:

1. ✅ Create an account at http://localhost:3000/register
2. ✅ Login with your credentials
3. ✅ Start a new quiz from the dashboard
4. ✅ Explore the leaderboard
5. ✅ Check your profile and statistics

## Additional Resources

- Main Documentation: `README.md`
- Quick Start Guide: `QUICKSTART.md`
- Backend API: http://localhost:5000/health
- Frontend: http://localhost:3000

## Support

If you encounter any issues:
1. Check the error messages in the terminal
2. Verify all environment variables are set
3. Make sure MongoDB is running
4. Verify TMDb API key is valid
5. Check browser console for frontend errors

---

**Installation Complete! Start Building Your Movie Quiz! 🎬✨**
