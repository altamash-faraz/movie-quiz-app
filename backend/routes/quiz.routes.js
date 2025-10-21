const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const Quiz = require('../models/Quiz.model');
const quizGenerator = require('../services/quizGenerator.service');

// @route   POST /api/quiz/generate
// @desc    Generate a new quiz
// @access  Private
router.post('/generate', protect, async (req, res) => {
  try {
    const { category, difficulty, questionCount = 10 } = req.body;

    // Validate inputs
    if (!['hollywood', 'bollywood', 'mixed'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be hollywood, bollywood, or mixed'
      });
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid difficulty. Must be easy, medium, or hard'
      });
    }

    // Generate quiz
    const quizData = await quizGenerator.generateQuiz(category, difficulty, questionCount);

    // Save quiz to database
    const quiz = await Quiz.create(quizData);

    res.status(201).json({
      success: true,
      message: 'Quiz generated successfully',
      data: quiz
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating quiz',
      error: error.message
    });
  }
});

// @route   GET /api/quiz/:id
// @desc    Get quiz by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Increment times played
    quiz.timesPlayed += 1;
    await quiz.save();

    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz',
      error: error.message
    });
  }
});

// @route   GET /api/quiz
// @desc    Get all quizzes with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { category, difficulty, page = 1, limit = 10 } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const quizzes = await Quiz.find(filter)
      .select('-questions.correctAnswer') // Don't send correct answers
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Quiz.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: quizzes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalQuizzes: count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quizzes',
      error: error.message
    });
  }
});

module.exports = router;
