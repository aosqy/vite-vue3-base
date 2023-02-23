import HttpRequest from "./axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const axios = new HttpRequest(baseUrl);

export default axios;
