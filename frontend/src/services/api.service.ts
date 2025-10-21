import api from '@/lib/api';

export const authService = {
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

export const movieService = {
  getPopular: async (page = 1) => {
    const response = await api.get(`/movies/popular?page=${page}`);
    return response.data;
  },

  getBollywood: async (page = 1) => {
    const response = await api.get(`/movies/bollywood?page=${page}`);
    return response.data;
  },

  getTrending: async (timeWindow = 'week') => {
    const response = await api.get(`/movies/trending?timeWindow=${timeWindow}`);
    return response.data;
  },

  getDetails: async (id: number) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  search: async (query: string, page = 1) => {
    const response = await api.get(`/movies/search/${query}?page=${page}`);
    return response.data;
  },
};

export const quizService = {
  generateQuiz: async (category: string, difficulty: string, questionCount = 10) => {
    const response = await api.post('/quiz/generate', { category, difficulty, questionCount });
    return response.data;
  },

  getQuiz: async (id: string) => {
    const response = await api.get(`/quiz/${id}`);
    return response.data;
  },

  getAllQuizzes: async (filters?: { category?: string; difficulty?: string; page?: number }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.page) params.append('page', filters.page.toString());
    
    const response = await api.get(`/quiz?${params.toString()}`);
    return response.data;
  },
};

export const scoreService = {
  submitScore: async (data: any) => {
    const response = await api.post('/scores', data);
    return response.data;
  },

  getUserScores: async (page = 1) => {
    const response = await api.get(`/scores/user?page=${page}`);
    return response.data;
  },

  getLeaderboard: async (category?: string, timeframe = 'all', limit = 10) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    params.append('timeframe', timeframe);
    params.append('limit', limit.toString());
    
    const response = await api.get(`/scores/leaderboard?${params.toString()}`);
    return response.data;
  },

  getScoreDetails: async (id: string) => {
    const response = await api.get(`/scores/${id}`);
    return response.data;
  },
};
