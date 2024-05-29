import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};


export const uploadAvatar = (formdata, token) => {
  return axios.post(`${API_URL}/upload-avatar` ,formdata, { headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } });
};
