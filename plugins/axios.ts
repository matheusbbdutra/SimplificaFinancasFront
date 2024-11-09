import { defineNuxtPlugin, useCookie } from '#app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie<string | null>('token');
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8081',
    });

    axiosInstance.interceptors.request.use((config) => {
        if (token.value) {
            config.headers.Authorization = `Bearer ${token.value}`;
        }
        return config;
    });


    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
    );

    return {
        provide: {
            axios: axiosInstance,
        },
    };
});
