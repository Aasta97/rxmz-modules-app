import axios from 'axios';
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'https://rxmz-modules-api.herokuapp.com',
    headers: {'Authorization': `Bearer ${token}`}
});

export default api;