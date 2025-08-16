import apiClient from './axios';

export default {
  getUsers(page = 0, limit = 10) {
    return apiClient.get('/user', {
      params: { page, limit }
    });
  },
  updateUser(id, userData) {
    const { firstName, lastName, title } = userData;
    return apiClient.put(`/user/${id}`, { firstName, lastName, title });
  },
  deleteUser(id) {
    return apiClient.delete(`/user/${id}`);
  }
};