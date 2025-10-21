const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  wrongAnswers: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number, // in seconds
    required: true
  },
  answers: [{
    questionIndex: Number,
    selectedAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    timeSpent: Number // in seconds
  }],
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
  percentage: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Calculate percentage before saving
scoreSchema.pre('save', function(next) {
  if (this.totalQuestions > 0) {
    this.percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
  }
  next();
});

// Index for leaderboard queries
scoreSchema.index({ score: -1, createdAt: -1 });
scoreSchema.index({ user: 1, createdAt: -1 });
scoreSchema.index({ category: 1, score: -1 });

module.exports = mongoose.model('Score', scoreSchema);
