import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/task';

export const getTasks = (token,id) => {
  return axios.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};


export const addTask = (newTask, token) => {
    console.log(newTask)
    return axios.post(`${API_URL}/add`, newTask, { headers: { Authorization: `Bearer ${token}` } });
  };


  export const updateTask = (id, updatedTask,token) => {
    return axios.put(`${API_URL}/update/${id}`, updatedTask, { headers: { Authorization:`Bearer ${token}` } });
  };


  export const deleteTask = (id,token) => {
    return axios.delete(`${API_URL}/delete/${id}`, { headers: { Authorization:`Bearer ${token}` } });
  };

