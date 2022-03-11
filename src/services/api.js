import axios from 'axios';
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'https://receipt-managemen-api-sxkynw6ufq-ue.a.run.app',
    headers: {'Authorization': `Bearer ${token}`}
});

export default api;