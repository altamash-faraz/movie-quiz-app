const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['hollywood', 'bollywood', 'mixed'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      enum: ['cast', 'crew', 'release', 'rating', 'genre', 'plot', 'trivia'],
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: String,
      required: true
    },
    movieId: {
      type: Number, // TMDb movie ID
      required: true
    },
    movieTitle: String,
    moviePoster: String,
    explanation: String,
    points: {
      type: Number,
      default: 10
    }
  }],
  timeLimit: {
    type: Number, // in seconds, 0 means no limit
    default: 0
  },
  totalPoints: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    default: 'system'
  },
  timesPlayed: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for finding quizzes
quizSchema.index({ category: 1, difficulty: 1, isActive: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
