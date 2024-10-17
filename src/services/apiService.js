import axios from 'axios';
import ThemedSwal from "../utils/Swal";

const token = sessionStorage.getItem('authToken');

const api = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const fetchData = async (url, errorMessage, data = null) => {
    try {
        const response = data
            ? await api.get(url, data)
            : await api.get(url);
        return response.data;
    } catch (error) {
        await ThemedSwal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
        });
    }
};

const postData = async (url, data, errorMessage) => {
    try {
        return await api.post(url, data);
    } catch (error) {
        await ThemedSwal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
        });
    }
};

export { fetchData, postData };
