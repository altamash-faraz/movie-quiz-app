# Movie Quiz App 🎬

A full-stack MERN application for testing your knowledge of Hollywood and Bollywood movies. Built with Next.js, Express.js, MongoDB, and TMDb API.

## Features ✨

- **User Authentication**: Secure registration and login system with JWT
- **Quiz Categories**: Hollywood, Bollywood, and Mixed quizzes
- **Multiple Difficulty Levels**: Easy, Medium, and Hard
- **Real-time Quiz**: Timed questions with instant feedback
- **Score Tracking**: Track your progress and statistics
- **Global Leaderboard**: Compete with other movie enthusiasts
- **Movie Data Integration**: Latest movie data from TMDb API
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack 🛠️

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Framer Motion** - Animation library
- **React Query** - Server state management
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **TMDb API** - Movie data source

## Prerequisites 📋

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- TMDb API Key (free at https://www.themoviedb.org/settings/api)

## Installation 🚀

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Movie Quiz app"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and add your configurations:
# - MongoDB connection string
# - JWT secret key
# - TMDb API key
# - Other environment variables

# Start the development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file from example
cp .env.local.example .env.local

# Edit .env.local and set the API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## Environment Variables 🔐

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/movie-quiz-db
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-quiz-db

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# TMDb API
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# CORS
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX_REQUESTS=40
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

## Getting TMDb API Key 🔑

**The app works without an API key using mock data for testing!**

For real movie data (optional):
1. Go to [TMDb website](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Fill out the form with your application details
6. Copy your API key and add it to backend `.env` file

**Note:** If TMDb is unavailable or no API key is provided, the app automatically uses mock movie data with popular Hollywood and Bollywood films.

## Project Structure 📁

```
Movie Quiz app/
├── backend/
│   ├── models/           # Mongoose models
│   │   ├── User.model.js
│   │   ├── Quiz.model.js
│   │   └── Score.model.js
│   ├── routes/           # Express routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── movie.routes.js
│   │   ├── quiz.routes.js
│   │   └── score.routes.js
│   ├── services/         # Business logic
│   │   ├── tmdb.service.js
│   │   └── quizGenerator.service.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.middleware.js
│   ├── server.js         # Entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── app/          # Next.js pages (App Router)
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── register/
    │   │   ├── login/
    │   │   ├── dashboard/
    │   │   ├── quiz/
    │   │   └── leaderboard/
    │   ├── components/   # React components
    │   ├── services/     # API services
    │   ├── store/        # Zustand stores
    │   └── lib/          # Utilities
    ├── package.json
    └── .env.local.example
```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `GET /api/users/stats` - Get user statistics (Protected)

### Movies
- `GET /api/movies/popular` - Get popular Hollywood movies
- `GET /api/movies/bollywood` - Get popular Bollywood movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/search/:query` - Search movies

### Quiz
- `POST /api/quiz/generate` - Generate new quiz (Protected)
- `GET /api/quiz/:id` - Get quiz by ID (Protected)
- `GET /api/quiz` - Get all quizzes with filters (Protected)

### Scores
- `POST /api/scores` - Submit quiz score (Protected)
- `GET /api/scores/user` - Get user's scores (Protected)
- `GET /api/scores/leaderboard` - Get global leaderboard (Public)
- `GET /api/scores/:id` - Get score details (Protected)

## Usage 💡

1. **Register/Login**: Create an account or login to access the quiz
2. **Select Quiz**: Choose a category (Hollywood, Bollywood, Mixed) and difficulty
3. **Take Quiz**: Answer questions within the time limit
4. **View Results**: See your score, correct answers, and explanations
5. **Track Progress**: View your statistics and history in the dashboard
6. **Compete**: Check your ranking on the global leaderboard

## Features in Detail 📝

### Quiz Generation
- Automatically generates questions from TMDb movie data
- Question types:
  - Cast identification
  - Director identification
  - Release year
  - Movie ratings
  - Genre classification
- Randomized options to prevent cheating
- Different point values based on difficulty

### User Dashboard
- Total score and quiz count
- Average score calculation
- High score tracking
- Quiz history
- Personal statistics

### Leaderboard
- Global rankings
- Filter by category
- Filter by timeframe (all-time, month, week)
- Real-time updates

## Development 🔧

### Backend Commands

```bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
npm test        # Run tests
```

### Frontend Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## Security Features 🔒

- Password hashing with bcryptjs
- JWT authentication
- Protected routes
- Rate limiting
- CORS configuration
- Helmet.js security headers
- Input validation

## Future Enhancements 🚀

- [ ] Social media authentication
- [ ] Custom quiz creation
- [ ] Multiplayer mode
- [ ] Daily challenges
- [ ] Achievement badges
- [ ] Friend system
- [ ] Quiz sharing
- [ ] More question types
- [ ] Video trailers in questions
- [ ] Mobile app

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License.

## Acknowledgments 🙏

- [TMDb](https://www.themoviedb.org/) for providing the movie data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [MongoDB](https://www.mongodb.com/) for the database
- All contributors and users of this project

## Support 💬

If you have any questions or need help, please open an issue on GitHub.

## Author ✍️

Created with ❤️ for movie enthusiasts

---

**Happy Quizzing! 🎬🍿**
