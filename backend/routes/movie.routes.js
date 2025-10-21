const express = require('express');
const router = express.Router();
const tmdbService = require('../services/tmdb.service');

// @route   GET /api/movies/popular
// @desc    Get popular Hollywood movies
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const movies = await tmdbService.getPopularMovies(page);
    
    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular movies',
      error: error.message
    });
  }
});

// @route   GET /api/movies/bollywood
// @desc    Get popular Bollywood movies
// @access  Public
router.get('/bollywood', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const movies = await tmdbService.getBollywoodMovies(page);
    
    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Bollywood movies',
      error: error.message
    });
  }
});

// @route   GET /api/movies/trending
// @desc    Get trending movies
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const { timeWindow = 'week' } = req.query;
    const movies = await tmdbService.getTrendingMovies(timeWindow);
    
    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trending movies',
      error: error.message
    });
  }
});

// @route   GET /api/movies/:id
// @desc    Get movie details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movie = await tmdbService.getMovieDetails(req.params.id);
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movie details',
      error: error.message
    });
  }
});

// @route   GET /api/movies/search/:query
// @desc    Search movies
// @access  Public
router.get('/search/:query', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const movies = await tmdbService.searchMovies(req.params.query, page);
    
    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching movies',
      error: error.message
    });
  }
});

module.exports = router;
