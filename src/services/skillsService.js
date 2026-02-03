import api from './api.js';

export const skillsService = {
  async getSkills() {
    return await api.get('/skills');
  },

  async getSkillById(id) {
    return await api.get(`/skills/${id}`);
  },

  async createSkill(data) {
    return await api.post('/skills', data);
  },

  async updateSkill(id, data) {
    return await api.put(`/skills/${id}`, data);
  },

  async deleteSkill(id) {
    return await api.delete(`/skills/${id}`);
  }
};
