# Movie Quiz App - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE                              │
│                      (Next.js Frontend)                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Landing     │  │  Auth Pages  │  │  Dashboard   │              │
│  │  Page        │  │  Login/      │  │  Profile     │              │
│  │              │  │  Register    │  │  Stats       │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Quiz        │  │  Results     │  │  Leaderboard │              │
│  │  Interface   │  │  Page        │  │  Rankings    │              │
│  │              │  │              │  │              │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                         HTTP/REST API
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                      BACKEND API SERVER                              │
│                      (Express.js + Node.js)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌────────────────────────── ROUTES ──────────────────────────┐     │
│  │                                                              │     │
│  │  /api/auth          /api/users         /api/movies         │     │
│  │  - Register         - Profile          - Popular           │     │
│  │  - Login            - Stats            - Bollywood         │     │
│  │                     - Update           - Trending          │     │
│  │                                                              │     │
│  │  /api/quiz          /api/scores                            │     │
│  │  - Generate         - Submit                               │     │
│  │  - Get Quiz         - History                              │     │
│  │  - List             - Leaderboard                          │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                       │
│  ┌────────────────────── MIDDLEWARE ────────────────────────────┐   │
│  │                                                              │   │
│  │  • JWT Authentication      • Rate Limiting                  │   │
│  │  • Input Validation        • Error Handling                 │   │
│  │  • CORS                    • Security Headers               │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────── SERVICES ─────────────────────────────┐   │
│  │                                                              │   │
│  │  TMDb Service          Quiz Generator                       │   │
│  │  - Fetch Movies        - Generate Questions                 │   │
│  │  - Get Details         - Create Options                     │   │
│  │  - Search              - Validate Answers                   │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────┬────────────────────────────────────┬─────────────────────┘
            │                                    │
            │                                    │
            ▼                                    ▼
┌───────────────────────────┐      ┌───────────────────────────┐
│     MongoDB Database      │      │      TMDb API             │
│                           │      │   (themoviedb.org)        │
├───────────────────────────┤      ├───────────────────────────┤
│                           │      │                           │
│  Collections:             │      │  • Popular Movies         │
│  • users                  │      │  • Bollywood Movies       │
│  • quizzes                │      │  • Movie Details          │
│  • scores                 │      │  • Cast & Crew            │
│                           │      │  • Ratings                │
│  Stores:                  │      │  • Posters & Images       │
│  • User accounts          │      │                           │
│  • Quiz data              │      │  Rate Limit:              │
│  • Score history          │      │  40 req/10 sec            │
│  • Leaderboard            │      │                           │
└───────────────────────────┘      └───────────────────────────┘
```

## Data Flow

### 1. User Registration Flow
```
User Input → Frontend Validation → API Request → Backend Validation
→ Hash Password → Save to MongoDB → Generate JWT → Return Token
→ Store in Frontend → Redirect to Dashboard
```

### 2. Quiz Generation Flow
```
User Selects Category & Difficulty → API Request → TMDb Service
→ Fetch Movies → Quiz Generator → Create Questions → Generate Options
→ Save Quiz → Return to Frontend → Display Quiz Interface
```

### 3. Quiz Taking Flow
```
User Answers Question → Track Time → Validate Answer → Calculate Score
→ Move to Next Question → Complete Quiz → Submit Score → Save to MongoDB
→ Update User Stats → Show Results → Update Leaderboard
```

### 4. Leaderboard Flow
```
User Opens Leaderboard → API Request → Query Scores → Sort by Score
→ Filter by Category/Time → Join with User Data → Return Rankings
→ Display on Frontend
```

## Technology Stack

### Frontend Layer
```
┌─────────────────────────────────────────┐
│  Next.js 14 (React Framework)           │
│  ├─ App Router                          │
│  ├─ Server Components                   │
│  └─ Client Components                   │
│                                         │
│  TypeScript (Type Safety)               │
│  Tailwind CSS (Styling)                 │
│  Framer Motion (Animations)             │
│  Zustand (State Management)             │
│  React Query (Server State)             │
│  Axios (HTTP Client)                    │
└─────────────────────────────────────────┘
```

### Backend Layer
```
┌─────────────────────────────────────────┐
│  Node.js + Express.js                   │
│  ├─ RESTful API                         │
│  ├─ Middleware Pipeline                 │
│  └─ Route Handlers                      │
│                                         │
│  Authentication                         │
│  ├─ JWT (jsonwebtoken)                  │
│  └─ bcryptjs (Password Hashing)         │
│                                         │
│  Database                               │
│  ├─ MongoDB                             │
│  ├─ Mongoose (ODM)                      │
│  └─ Schema Validation                   │
│                                         │
│  External APIs                          │
│  └─ TMDb API (Movie Data)               │
└─────────────────────────────────────────┘
```

### Security Layer
```
┌─────────────────────────────────────────┐
│  Security Features                      │
│  ├─ Helmet.js (Security Headers)        │
│  ├─ CORS (Cross-Origin)                 │
│  ├─ Rate Limiting (Abuse Prevention)    │
│  ├─ Input Validation                    │
│  ├─ Password Hashing (bcrypt)           │
│  └─ JWT Authentication                  │
└─────────────────────────────────────────┘
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, 3-30 chars),
  email: String (unique, validated),
  password: String (hashed),
  totalScore: Number (default: 0),
  quizzesCompleted: Number (default: 0),
  averageScore: Number (calculated),
  highScore: Number (default: 0),
  preferences: {
    favoriteGenres: [String],
    preferredLanguage: String (hollywood/bollywood/both),
    difficulty: String (easy/medium/hard)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Quizzes Collection
```javascript
{
  _id: ObjectId,
  title: String,
  category: String (hollywood/bollywood/mixed),
  difficulty: String (easy/medium/hard),
  questions: [{
    questionText: String,
    questionType: String (cast/crew/release/rating/genre),
    options: [String] (4 options),
    correctAnswer: String,
    movieId: Number (TMDb ID),
    movieTitle: String,
    moviePoster: String (URL),
    explanation: String,
    points: Number
  }],
  timeLimit: Number (seconds),
  totalPoints: Number,
  isActive: Boolean,
  timesPlayed: Number,
  averageScore: Number,
  createdAt: Date
}
```

### Scores Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  quiz: ObjectId (ref: Quiz),
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  timeTaken: Number (seconds),
  answers: [{
    questionIndex: Number,
    selectedAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    timeSpent: Number
  }],
  category: String,
  difficulty: String,
  percentage: Number (calculated),
  createdAt: Date
}
```

## API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /register` - Create new account
- `POST /login` - User login

### Users (`/api/users`)
- `GET /profile` - Get user profile (Protected)
- `PUT /profile` - Update profile (Protected)
- `GET /stats` - Get statistics (Protected)

### Movies (`/api/movies`)
- `GET /popular` - Hollywood movies
- `GET /bollywood` - Bollywood movies
- `GET /trending` - Trending movies
- `GET /:id` - Movie details
- `GET /search/:query` - Search movies

### Quiz (`/api/quiz`)
- `POST /generate` - Generate quiz (Protected)
- `GET /:id` - Get quiz (Protected)
- `GET /` - List quizzes (Protected)

### Scores (`/api/scores`)
- `POST /` - Submit score (Protected)
- `GET /user` - User's scores (Protected)
- `GET /leaderboard` - Global rankings (Public)
- `GET /:id` - Score details (Protected)

## Environment Configuration

### Backend Environment Variables
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/movie-quiz-db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
TMDB_API_KEY=your_tmdb_key
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX_REQUESTS=40
```

### Frontend Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

## State Management (Frontend)

### Auth Store (Zustand)
```javascript
{
  user: User | null,
  token: string | null,
  isAuthenticated: boolean,
  login: (user, token) => void,
  logout: () => void,
  updateUser: (userData) => void
}
```

### Quiz Store (Zustand)
```javascript
{
  currentQuiz: Quiz | null,
  currentQuestionIndex: number,
  answers: Answer[],
  score: number,
  startTime: number,
  isQuizActive: boolean,
  setQuiz: (quiz) => void,
  startQuiz: () => void,
  answerQuestion: (answer) => void,
  nextQuestion: () => void,
  endQuiz: () => void,
  resetQuiz: () => void
}
```

## Deployment Architecture

```
┌──────────────────────────────────────────┐
│         Frontend (Vercel)                 │
│         - Automatic Builds                │
│         - CDN Distribution                │
│         - SSL Certificates                │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│      Backend (Railway/Heroku)            │
│      - Node.js Server                    │
│      - Environment Variables             │
│      - Auto-scaling                      │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────┐
│      Database (MongoDB Atlas)            │
│      - Managed MongoDB                   │
│      - Automatic Backups                 │
│      - Global Distribution               │
└──────────────────────────────────────────┘
```

## Performance Optimizations

1. **Frontend**
   - Code splitting (Next.js)
   - Image optimization
   - Lazy loading
   - Static generation where possible
   - Client-side caching

2. **Backend**
   - Database indexing
   - Query optimization
   - Response caching
   - Rate limiting
   - Connection pooling

3. **Database**
   - Indexed queries
   - Aggregate pipelines
   - Lean queries
   - Projection optimization

## Security Measures

1. **Authentication**
   - JWT tokens (7 day expiry)
   - Password hashing (bcrypt, 10 rounds)
   - Secure token storage

2. **Authorization**
   - Protected routes
   - User ownership verification
   - Role-based access (extendable)

3. **Data Protection**
   - Input validation
   - SQL injection prevention
   - XSS protection
   - CSRF protection

4. **API Security**
   - Rate limiting
   - CORS configuration
   - Security headers (Helmet)
   - HTTPS enforcement (production)

---

**Architecture designed for scalability, security, and performance** 🚀
