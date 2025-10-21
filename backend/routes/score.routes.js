const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const Score = require('../models/Score.model');
const User = require('../models/User.model');
const Quiz = require('../models/Quiz.model');

// @route   POST /api/scores
// @desc    Submit quiz score
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      quizId,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      timeTaken,
      answers,
      category,
      difficulty
    } = req.body;

    // Create score record
    const scoreRecord = await Score.create({
      user: req.user._id,
      quiz: quizId,
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      timeTaken,
      answers,
      category,
      difficulty
    });

    // Update user statistics
    const user = await User.findById(req.user._id);
    user.totalScore += score;
    user.quizzesCompleted += 1;
    user.updateAverageScore();
    if (score > user.highScore) {
      user.highScore = score;
    }
    await user.save();

    // Update quiz statistics
    const quiz = await Quiz.findById(quizId);
    if (quiz) {
      const totalScore = quiz.averageScore * (quiz.timesPlayed - 1) + score;
      quiz.averageScore = Math.round(totalScore / quiz.timesPlayed);
      await quiz.save();
    }

    res.status(201).json({
      success: true,
      message: 'Score submitted successfully',
      data: {
        scoreRecord,
        userStats: {
          totalScore: user.totalScore,
          quizzesCompleted: user.quizzesCompleted,
          averageScore: user.averageScore,
          highScore: user.highScore
        }
      }
    });
  } catch (error) {
    console.error('Score submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting score',
      error: error.message
    });
  }
});

// @route   GET /api/scores/user
// @desc    Get user's scores
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const scores = await Score.find({ user: req.user._id })
      .populate('quiz', 'title category difficulty')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Score.countDocuments({ user: req.user._id });

    res.status(200).json({
      success: true,
      data: scores,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalScores: count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user scores',
      error: error.message
    });
  }
});

// @route   GET /api/scores/leaderboard
// @desc    Get global leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const { category, timeframe = 'all', limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;

    // Filter by timeframe
    if (timeframe !== 'all') {
      const date = new Date();
      if (timeframe === 'week') {
        date.setDate(date.getDate() - 7);
      } else if (timeframe === 'month') {
        date.setMonth(date.getMonth() - 1);
      }
      filter.createdAt = { $gte: date };
    }

    const leaderboard = await Score.find(filter)
      .populate('user', 'username avatar')
      .populate('quiz', 'title')
      .limit(limit * 1)
      .sort({ score: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
});

// @route   GET /api/scores/:id
// @desc    Get score details
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const score = await Score.findById(req.params.id)
      .populate('quiz', 'title questions category difficulty')
      .populate('user', 'username');

    if (!score) {
      return res.status(404).json({
        success: false,
        message: 'Score not found'
      });
    }

    // Check if user owns this score
    if (score.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this score'
      });
    }

    res.status(200).json({
      success: true,
      data: score
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching score details',
      error: error.message
    });
  }
});

module.exports = router;
