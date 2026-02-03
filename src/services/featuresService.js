import api from './api.js';

export const featuresService = {
  async getFeatures() {
    return await api.get('/features');
  },

  async getFeatureById(id) {
    return await api.get(`/features/${id}`);
  },

  async createFeature(data) {
    return await api.post('/features', data);
  },

  async updateFeature(id, data) {
    return await api.put(`/features/${id}`, data);
  },

  async deleteFeature(id) {
    return await api.delete(`/features/${id}`);
  }
};
