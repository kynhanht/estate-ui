import axios from 'axios';
import { store } from '~/redux/store';
import { BASE_BACKEND_URL } from '~/services/constant';

// Set config defaults when creating the instance
const api = axios.create({
    baseURL: BASE_BACKEND_URL,
});

// Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = store.getState().jwtAuthReducer.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    },
);

// // Add a response interceptor
api.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response && error.response.status === 401) {
            // store.dispatch(logoutUser());
        }
        console.log(error);
        return Promise.reject(error);
    },
);

export default api;
