import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");

    console.log("Interceptor executed");
    console.log("Token:", token);

    if (token) {
        config.headers.setAuthorization(`Bearer ${token}`);
    }

    console.log(config.headers.toJSON());

    return config;
});

export default api;