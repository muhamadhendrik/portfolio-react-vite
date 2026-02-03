import api from './api.js';

export const projectsService = {
  async getProjects() {
    return await api.get('/projects');
  },

  async getProjectById(id) {
    return await api.get(`/projects/${id}`);
  },

  async createProject(data) {
    return await api.post('/projects', data);
  },

  async updateProject(id, data) {
    return await api.put(`/projects/${id}`, data);
  },

  async deleteProject(id) {
    return await api.delete(`/projects/${id}`);
  }
};
