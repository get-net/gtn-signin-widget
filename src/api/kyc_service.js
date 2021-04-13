import axios from "axios";
import storageManager from "../utils/storageManager";
const kyc = axios.create({
    baseURL: "https://test.id.gtn.ee",
});

kyc.interceptors.request.use((config) => {
    const token = storageManager.getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

export default kyc;
