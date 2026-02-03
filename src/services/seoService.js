import api from './api.js';

export const seoService = {
  async getSeoSettings() {
    return await api.get('/seo');
  },

  async getSeoByPage(page) {
    return await api.get(`/seo/page/${page}`);
  },

  async upsertSeoSettings(data) {
    return await api.post('/seo/upsert', data);
  },

  async updateSeoSettings(page, data) {
    return await api.put(`/seo/page/${page}`, data);
  }
};
