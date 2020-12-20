import axios from "axios";

export const configureAxios = () => {
    const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
    const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
    axios.defaults.baseURL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api`;
};
