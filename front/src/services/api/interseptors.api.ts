import axios from "axios";

export const api = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
});

// REQUEST interceptor
api.interceptors.request.use(
    (config) => {

        console.log("Request:", config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// RESPONSE interceptor
api.interceptors.response.use(
    (response) => {
        console.log("Response:", response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(
                `Response error: ${error.response.status} — ${error.response.config.url}`
            );
        } else {
            console.error("Network error:", error.message);
        }

        return Promise.reject(error);
    }
);
