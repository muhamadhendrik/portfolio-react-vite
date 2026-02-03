import api from './api.js';

export const contactService = {
  async submitContact(data) {
    return await api.post('/contact', data);
  },

  async getMessages() {
    return await api.get('/contact/messages');
  }
};
