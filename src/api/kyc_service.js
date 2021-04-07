import axios from "axios"
import storageManager from "../utils/storageManager"
const kyc = axios.create({
    baseURL: "http://localhost/",
});

kyc.interceptors.request.use(config => {
    const token = storageManager.getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export default kyc