const tmdbService = require('./tmdb.service');

class QuizGeneratorService {
  constructor() {
    this.questionTypes = {
      cast: this.generateCastQuestion.bind(this),
      director: this.generateDirectorQuestion.bind(this),
      release: this.generateReleaseQuestion.bind(this),
      rating: this.generateRatingQuestion.bind(this),
      genre: this.generateGenreQuestion.bind(this)
    };
  }

  // Generate a complete quiz
  async generateQuiz(category, difficulty, questionCount = 10) {
    try {
      let movies;
      
      // Fetch movies based on category
      if (category === 'hollywood') {
        const data = await tmdbService.getPopularMovies(Math.ceil(Math.random() * 5));
        movies = data.results;
      } else if (category === 'bollywood') {
        const data = await tmdbService.getBollywoodMovies(Math.ceil(Math.random() * 3));
        movies = data.results;
      } else {
        // Mixed: combine both
        const hollywood = await tmdbService.getPopularMovies(1);
        const bollywood = await tmdbService.getBollywoodMovies(1);
        movies = [...hollywood.results.slice(0, 5), ...bollywood.results.slice(0, 5)];
      }

      // Shuffle movies
      movies = this.shuffleArray(movies);

      const questions = [];
      const movieDetailsPromises = movies.slice(0, questionCount).map(movie => 
        tmdbService.getMovieDetails(movie.id)
      );

      const detailedMovies = await Promise.all(movieDetailsPromises);

      for (let i = 0; i < Math.min(questionCount, detailedMovies.length); i++) {
        const movie = detailedMovies[i];
        const questionType = this.getRandomQuestionType();
        const question = await this.questionTypes[questionType](movie, difficulty);
        
        if (question) {
          questions.push({
            ...question,
            movieId: movie.id,
            movieTitle: movie.title,
            moviePoster: tmdbService.getImageUrl(movie.poster_path),
            points: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20
          });
        }
      }

      const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

      return {
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Movie Quiz - ${difficulty}`,
        category,
        difficulty,
        questions,
        totalPoints,
        timeLimit: difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 15 // seconds per question
      };
    } catch (error) {
      throw new Error(`Error generating quiz: ${error.message}`);
    }
  }

  // Generate cast question
  async generateCastQuestion(movie, difficulty) {
    if (!movie.credits || !movie.credits.cast || movie.credits.cast.length < 4) {
      return null;
    }

    const cast = movie.credits.cast.slice(0, 10);
    const correctActor = cast[Math.floor(Math.random() * Math.min(3, cast.length))];
    
    // Get wrong options from other cast members
    const wrongOptions = cast
      .filter(actor => actor.id !== correctActor.id)
      .slice(0, 3)
      .map(actor => actor.name);

    // If not enough wrong options, add some generic names
    while (wrongOptions.length < 3) {
      const genericNames = ['Tom Smith', 'Jane Doe', 'John Anderson', 'Mary Johnson', 'Robert Brown'];
      const randomName = genericNames[Math.floor(Math.random() * genericNames.length)];
      if (!wrongOptions.includes(randomName) && randomName !== correctActor.name) {
        wrongOptions.push(randomName);
      }
    }

    const options = this.shuffleArray([correctActor.name, ...wrongOptions.slice(0, 3)]);

    return {
      questionText: `Who acted in the movie "${movie.title}"?`,
      questionType: 'cast',
      options,
      correctAnswer: correctActor.name,
      explanation: `${correctActor.name} played ${correctActor.character} in ${movie.title}.`
    };
  }

  // Generate director question
  async generateDirectorQuestion(movie, difficulty) {
    if (!movie.credits || !movie.credits.crew) {
      return null;
    }

    const directors = movie.credits.crew.filter(person => person.job === 'Director');
    if (directors.length === 0) {
      return null;
    }

    const correctDirector = directors[0];
    
    // Generate plausible wrong directors (other crew members or common director names)
    const wrongDirectors = ['Christopher Nolan', 'Steven Spielberg', 'Martin Scorsese', 
                           'Quentin Tarantino', 'Rajkumar Hirani', 'S.S. Rajamouli']
      .filter(name => name !== correctDirector.name)
      .slice(0, 3);

    const options = this.shuffleArray([correctDirector.name, ...wrongDirectors]);

    return {
      questionText: `Who directed the movie "${movie.title}"?`,
      questionType: 'crew',
      options,
      correctAnswer: correctDirector.name,
      explanation: `${movie.title} was directed by ${correctDirector.name}.`
    };
  }

  // Generate release year question
  async generateReleaseQuestion(movie, difficulty) {
    if (!movie.release_date) {
      return null;
    }

    const correctYear = new Date(movie.release_date).getFullYear();
    const wrongYears = [
      correctYear - 1,
      correctYear + 1,
      correctYear - 2
    ].map(year => year.toString());

    const options = this.shuffleArray([correctYear.toString(), ...wrongYears]);

    return {
      questionText: `When was "${movie.title}" released?`,
      questionType: 'release',
      options,
      correctAnswer: correctYear.toString(),
      explanation: `${movie.title} was released in ${correctYear}.`
    };
  }

  // Generate rating question
  async generateRatingQuestion(movie, difficulty) {
    if (!movie.vote_average) {
      return null;
    }

    const correctRating = movie.vote_average.toFixed(1);
    const rating = parseFloat(correctRating);
    
    const wrongRatings = [
      (rating - 0.5).toFixed(1),
      (rating + 0.5).toFixed(1),
      (rating - 1.0).toFixed(1)
    ];

    const options = this.shuffleArray([correctRating, ...wrongRatings]);

    return {
      questionText: `What is the approximate rating of "${movie.title}" on TMDb?`,
      questionType: 'rating',
      options,
      correctAnswer: correctRating,
      explanation: `${movie.title} has a rating of ${correctRating}/10 on TMDb.`
    };
  }

  // Generate genre question
  async generateGenreQuestion(movie, difficulty) {
    if (!movie.genres || movie.genres.length === 0) {
      return null;
    }

    const correctGenre = movie.genres[0].name;
    const allGenres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 
                      'Science Fiction', 'Animation', 'Documentary', 'Crime'];
    
    const wrongGenres = allGenres
      .filter(genre => !movie.genres.some(g => g.name === genre))
      .slice(0, 3);

    const options = this.shuffleArray([correctGenre, ...wrongGenres]);

    return {
      questionText: `What is the primary genre of "${movie.title}"?`,
      questionType: 'genre',
      options,
      correctAnswer: correctGenre,
      explanation: `${movie.title} is primarily a ${correctGenre} movie.`
    };
  }

  // Helper methods
  getRandomQuestionType() {
    const types = Object.keys(this.questionTypes);
    return types[Math.floor(Math.random() * types.length)];
  }

  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}

module.exports = new QuizGeneratorService();
