import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001";

const getPublicContent = () => {
    return axios.get(API_URL + "/");
};

const getUserBoard = () => {
    return axios.get(API_URL + "/users", );
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "/mod/:id", );
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
};

export default UserService;
