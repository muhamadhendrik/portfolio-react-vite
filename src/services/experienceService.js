import api from './api.js';

export const experienceService = {
  async getExperience() {
    return await api.get('/experience');
  },

  async getExperienceById(id) {
    return await api.get(`/experience/${id}`);
  },

  async createExperience(data) {
    return await api.post('/experience', data);
  },

  async updateExperience(id, data) {
    return await api.put(`/experience/${id}`, data);
  },

  async deleteExperience(id) {
    return await api.delete(`/experience/${id}`);
  }
};
