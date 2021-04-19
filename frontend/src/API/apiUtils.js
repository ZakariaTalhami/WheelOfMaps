const BACKEND_HOST =
    process.env.REACT_APP_BACKEND_HOST || window.location.hostname;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || "";

export const BACKEND_BASE_URL = `${window.location.protocol}//${BACKEND_HOST}:${BACKEND_PORT}`;
