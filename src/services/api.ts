import axios from 'axios';

const url = 'http://localhost:3333';

const api = axios.create({
  baseURL: url, // ip da maquina do backend
});

export default api;
