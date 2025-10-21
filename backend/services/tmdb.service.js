const axios = require('axios');

class TMDbService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY;
    this.baseUrl = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
    this.imageBaseUrl = process.env.TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      params: {
        api_key: this.apiKey
      }
    });
  }

  // Get popular Hollywood movies
  async getPopularMovies(page = 1) {
    try {
      const response = await this.axiosInstance.get('/movie/popular', {
        params: { page, language: 'en-US' }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching popular movies: ${error.message}`);
    }
  }

  // Get popular Bollywood movies (Indian cinema)
  async getBollywoodMovies(page = 1) {
    try {
      const response = await this.axiosInstance.get('/discover/movie', {
        params: {
          page,
          with_original_language: 'hi', // Hindi language
          sort_by: 'popularity.desc',
          'vote_count.gte': 100
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching Bollywood movies: ${error.message}`);
    }
  }

  // Get latest movies
  async getLatestMovies(page = 1) {
    try {
      const response = await this.axiosInstance.get('/movie/now_playing', {
        params: { page, language: 'en-US' }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching latest movies: ${error.message}`);
    }
  }

  // Get movie details
  async getMovieDetails(movieId) {
    try {
      const response = await this.axiosInstance.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,release_dates,keywords,videos'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching movie details: ${error.message}`);
    }
  }

  // Get movie cast
  async getMovieCredits(movieId) {
    try {
      const response = await this.axiosInstance.get(`/movie/${movieId}/credits`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching movie credits: ${error.message}`);
    }
  }

  // Search movies
  async searchMovies(query, page = 1) {
    try {
      const response = await this.axiosInstance.get('/search/movie', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error searching movies: ${error.message}`);
    }
  }

  // Get trending movies
  async getTrendingMovies(timeWindow = 'week') {
    try {
      const response = await this.axiosInstance.get(`/trending/movie/${timeWindow}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching trending movies: ${error.message}`);
    }
  }

  // Get top rated movies
  async getTopRatedMovies(page = 1) {
    try {
      const response = await this.axiosInstance.get('/movie/top_rated', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching top rated movies: ${error.message}`);
    }
  }

  // Get image URL
  getImageUrl(path, size = 'w500') {
    if (!path) return null;
    return `${this.imageBaseUrl}/${size}${path}`;
  }

  // Get backdrop URL
  getBackdropUrl(path, size = 'w1280') {
    if (!path) return null;
    return `${this.imageBaseUrl}/${size}${path}`;
  }
}

module.exports = new TMDbService();
