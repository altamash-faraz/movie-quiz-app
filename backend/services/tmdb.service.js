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
      // Try TMDb API first, fallback to mock data if it fails
      if (!this.apiKey || this.apiKey === 'YOUR_TMDB_API_KEY_HERE') {
        console.log('🎬 Using mock data - TMDb API key not configured');
        return this.getMockHollywoodMovies();
      }
      
      const response = await this.axiosInstance.get('/movie/popular', {
        params: { page, language: 'en-US' }
      });
      return response.data;
    } catch (error) {
      console.log('🎬 TMDb API unavailable, using mock data:', error.message);
      return this.getMockHollywoodMovies();
    }
  }

  // Get popular Bollywood movies (Indian cinema)
  async getBollywoodMovies(page = 1) {
    try {
      if (!this.apiKey || this.apiKey === 'YOUR_TMDB_API_KEY_HERE') {
        console.log('🎭 Using mock data - TMDb API key not configured');
        return this.getMockBollywoodMovies();
      }
      
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
      console.log('🎭 TMDb API unavailable, using mock data:', error.message);
      return this.getMockBollywoodMovies();
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
      if (!this.apiKey || this.apiKey === 'YOUR_TMDB_API_KEY_HERE') {
        return this.getMockMovieDetails(movieId);
      }
      
      const response = await this.axiosInstance.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,release_dates,keywords,videos'
        }
      });
      return response.data;
    } catch (error) {
      console.log(`🎬 Getting mock details for movie ${movieId}`);
      return this.getMockMovieDetails(movieId);
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

  // Mock data methods for when TMDb is unavailable
  getMockHollywoodMovies() {
    return {
      page: 1,
      results: [
        {
          id: 1,
          title: "The Dark Knight",
          overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.",
          poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
          release_date: "2008-07-18",
          vote_average: 9.0,
          genre_ids: [28, 80, 18]
        },
        {
          id: 2,
          title: "Inception",
          overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
          poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
          release_date: "2010-07-16",
          vote_average: 8.8,
          genre_ids: [28, 878, 53]
        },
        {
          id: 3,
          title: "Interstellar",
          overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
          poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
          release_date: "2014-11-07",
          vote_average: 8.6,
          genre_ids: [18, 878]
        },
        {
          id: 4,
          title: "The Avengers",
          overview: "Earth's mightiest heroes must come together and learn to fight as a team.",
          poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
          backdrop_path: "/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg",
          release_date: "2012-05-04",
          vote_average: 8.0,
          genre_ids: [28, 12, 878]
        },
        {
          id: 5,
          title: "Avatar",
          overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission.",
          poster_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
          backdrop_path: "/o0s4XsEDfDlvit5pDRKjzXR4pp2.jpg",
          release_date: "2009-12-18",
          vote_average: 7.9,
          genre_ids: [28, 12, 14, 878]
        }
      ],
      total_pages: 1,
      total_results: 5
    };
  }

  getMockBollywoodMovies() {
    return {
      page: 1,
      results: [
        {
          id: 101,
          title: "3 Idiots",
          overview: "Two friends embark on a quest for a lost buddy. On this journey, they encounter a long forgotten bet.",
          poster_path: "/66A9MqXOyVFCssoloscw_X_L46l.jpg",
          backdrop_path: "/zeAZIPUX6U2MP9PQSjNQp9XON7b.jpg",
          release_date: "2009-12-25",
          vote_average: 8.4,
          genre_ids: [35, 18]
        },
        {
          id: 102,
          title: "Dangal",
          overview: "A former wrestler and his two wrestler daughters aspire towards glory at the Commonwealth Games.",
          poster_path: "/lzrjUsnyqFBklgz7pqSgSSsW92K.jpg",
          backdrop_path: "/k5u9jglaEBrfwGb6CeiJFzBcPEm.jpg",
          release_date: "2016-12-23",
          vote_average: 8.5,
          genre_ids: [18]
        },
        {
          id: 103,
          title: "Zindagi Na Milegi Dobara",
          overview: "Three friends go on a bachelor trip to Spain and end up discovering themselves.",
          poster_path: "/y9dO9QRJS4ThJp6CVTrfGLN2GJK.jpg",
          backdrop_path: "/iFiVjUe8e2LCKo8K0e5mSE2CJiU.jpg",
          release_date: "2011-07-15",
          vote_average: 8.1,
          genre_ids: [12, 35, 18]
        },
        {
          id: 104,
          title: "Baahubali: The Beginning",
          overview: "A young man learns about his legacy and fights to claim his birthright.",
          poster_path: "/6ea7oLKZ6zAyRkJnLYelcD7qJa.jpg",
          backdrop_path: "/pFVFjzAl7mxORSV8UsZdpcZM7ky.jpg",
          release_date: "2015-07-10",
          vote_average: 8.0,
          genre_ids: [28, 12, 18]
        },
        {
          id: 105,
          title: "Lagaan",
          overview: "The people of a small village in Victorian India stake their future on a game of cricket.",
          poster_path: "/UrqJ5DG8M4mRRdtKYFnJOOjH5Sg.jpg",
          backdrop_path: "/f3FEoKh3D1FBHNkCRaRGFWk2T0k.jpg",
          release_date: "2001-06-15",
          vote_average: 8.1,
          genre_ids: [18, 10751]
        }
      ],
      total_pages: 1,
      total_results: 5
    };
  }

  getMockMovieDetails(movieId) {
    const mockDetails = {
      1: {
        id: 1,
        title: "The Dark Knight",
        overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        release_date: "2008-07-18",
        vote_average: 9.0,
        runtime: 152,
        genres: [{ id: 28, name: "Action" }, { id: 80, name: "Crime" }, { id: 18, name: "Drama" }],
        credits: {
          cast: [
            { id: 1, name: "Christian Bale", character: "Bruce Wayne / Batman" },
            { id: 2, name: "Heath Ledger", character: "Joker" },
            { id: 3, name: "Aaron Eckhart", character: "Harvey Dent / Two-Face" },
            { id: 4, name: "Michael Caine", character: "Alfred Pennyworth" }
          ],
          crew: [
            { id: 101, name: "Christopher Nolan", job: "Director" },
            { id: 102, name: "Jonathan Nolan", job: "Writer" }
          ]
        }
      },
      2: {
        id: 2,
        title: "Inception",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
        poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        release_date: "2010-07-16",
        vote_average: 8.8,
        runtime: 148,
        genres: [{ id: 28, name: "Action" }, { id: 878, name: "Science Fiction" }],
        credits: {
          cast: [
            { id: 11, name: "Leonardo DiCaprio", character: "Dom Cobb" },
            { id: 12, name: "Marion Cotillard", character: "Mal" },
            { id: 13, name: "Tom Hardy", character: "Eames" },
            { id: 14, name: "Ellen Page", character: "Ariadne" }
          ],
          crew: [
            { id: 101, name: "Christopher Nolan", job: "Director" },
            { id: 101, name: "Christopher Nolan", job: "Writer" }
          ]
        }
      },
      101: {
        id: 101,
        title: "3 Idiots",
        overview: "Two friends embark on a quest for a lost buddy. On this journey, they encounter a long forgotten bet.",
        poster_path: "/66A9MqXOyVFCssoloscw_X_L46l.jpg",
        release_date: "2009-12-25",
        vote_average: 8.4,
        runtime: 170,
        genres: [{ id: 35, name: "Comedy" }, { id: 18, name: "Drama" }],
        credits: {
          cast: [
            { id: 201, name: "Aamir Khan", character: "Rancho" },
            { id: 202, name: "Madhavan", character: "Farhan" },
            { id: 203, name: "Sharman Joshi", character: "Raju" },
            { id: 204, name: "Kareena Kapoor", character: "Pia" }
          ],
          crew: [
            { id: 301, name: "Rajkumar Hirani", job: "Director" },
            { id: 302, name: "Abhijat Joshi", job: "Writer" }
          ]
        }
      }
    };
    
    return mockDetails[movieId] || {
      id: movieId,
      title: "Mock Movie",
      overview: "This is a mock movie for testing purposes.",
      poster_path: "/default.jpg",
      release_date: "2023-01-01",
      vote_average: 7.5,
      runtime: 120,
      genres: [{ id: 1, name: "Drama" }],
      credits: {
        cast: [
          { id: 1, name: "Actor One", character: "Character One" },
          { id: 2, name: "Actor Two", character: "Character Two" }
        ],
        crew: [
          { id: 101, name: "Director One", job: "Director" }
        ]
      }
    };
  }
}

module.exports = new TMDbService();
