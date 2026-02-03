import api from './api.js';

export const authService = {
  async login(username, password) {
    const response = await api.post('/auth/login', { username, password });

    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('auth_token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
