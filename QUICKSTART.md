# Quick Start Guide 🚀

Follow these steps to get your Movie Quiz App up and running quickly!

## Step 1: Install Dependencies

### Backend
```powershell
cd backend
npm install
```

### Frontend  
```powershell
cd frontend
npm install
```

## Step 2: Get TMDb API Key

1. Visit https://www.themoviedb.org/
2. Sign up for a free account
3. Go to Settings → API
4. Click "Request an API Key"
5. Choose "Developer" and fill out the form
6. Copy your API key

## Step 3: Setup Environment Variables

### Backend - Create `.env` file

```powershell
cd backend
Copy-Item .env.example .env
notepad .env
```

Add your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/movie-quiz-db
JWT_SECRET=your_secret_key_change_this_in_production
JWT_EXPIRE=7d
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
FRONTEND_URL=http://localhost:3000
```

### Frontend - Create `.env.local` file

```powershell
cd frontend
Copy-Item .env.local.example .env.local
notepad .env.local
```

Add:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

## Step 4: Start MongoDB

### Option A: Local MongoDB
```powershell
# Make sure MongoDB is installed and running
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## Step 5: Start the Servers

### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📍 Environment: development
```

### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.5s
```

## Step 6: Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/health

## Step 7: Create Your First Account

1. Click "Get Started" or "Register"
2. Fill in your details:
   - Username (min 3 characters)
   - Email
   - Password (min 6 characters)
3. Click "Register"

## Step 8: Take Your First Quiz

1. Go to Dashboard
2. Click "Start New Quiz"
3. Select:
   - Category: Hollywood / Bollywood / Mixed
   - Difficulty: Easy / Medium / Hard
4. Click "Generate Quiz"
5. Answer the questions
6. View your results!

## Troubleshooting 🔧

### MongoDB Connection Error
```
❌ MongoDB Connection Error
```
**Solution**: 
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- Try: `mongodb://127.0.0.1:27017/movie-quiz-db`

### TMDb API Error
```
Error fetching movies: Unauthorized
```
**Solution**:
- Verify your `TMDB_API_KEY` in backend `.env`
- Make sure there are no extra spaces
- Get a new key if needed

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Or change PORT in .env
```

### Frontend Build Errors
```
Module not found: Can't resolve 'react'
```
**Solution**:
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### CORS Errors
```
Access to fetch blocked by CORS policy
```
**Solution**:
- Check `FRONTEND_URL` in backend `.env`
- Make sure it matches your frontend URL
- Restart backend server

## Testing the API 🧪

You can test API endpoints using PowerShell or a tool like Postman:

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET
```

### Register User
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Get Popular Movies
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/movies/popular" -Method GET
```

## Project Structure 📁

```
Movie Quiz app/
├── backend/                 # Express.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── middleware/         # Custom middleware
│   └── server.js           # Entry point
│
├── frontend/               # Next.js frontend
│   └── src/
│       ├── app/            # Next.js pages
│       ├── components/     # React components
│       ├── services/       # API services
│       ├── store/          # State management
│       └── lib/            # Utilities
│
└── README.md              # Full documentation
```

## Next Steps 🎯

1. ✅ Take a few quizzes to test the system
2. ✅ Check the leaderboard
3. ✅ Explore your dashboard and statistics
4. ✅ Try different difficulty levels
5. ✅ Customize the app (add features, change styling)

## Common Commands 📝

### Backend
```powershell
npm run dev      # Start development server
npm start        # Start production server
```

### Frontend
```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

### Database
```powershell
mongosh                              # Connect to MongoDB
use movie-quiz-db                    # Select database
db.users.find()                      # View users
db.quizzes.find()                    # View quizzes
db.scores.find()                     # View scores
```

## Environment URLs 🌐

- **Local Development**
  - Frontend: http://localhost:3000
  - Backend: http://localhost:5000
  - MongoDB: mongodb://localhost:27017

- **Production** (when deployed)
  - Update URLs in environment variables
  - Use environment-specific `.env` files

## Support & Resources 📚

- **TMDb API Docs**: https://developers.themoviedb.org/3
- **Next.js Docs**: https://nextjs.org/docs
- **Express.js Docs**: https://expressjs.com/
- **MongoDB Docs**: https://docs.mongodb.com/

## Need Help? 💬

If you encounter any issues:
1. Check this guide's troubleshooting section
2. Review the main README.md
3. Check browser console for errors
4. Check terminal for error messages
5. Verify all environment variables are set correctly

---

**Happy Coding! 🎬✨**
