import axios from "axios";

const API_URL = "http://localhost:3001/users";

const register = (name, email, password,is_mod,Is_admin) => {
    return axios.post(API_URL + "/signup", {
        name,
        email,
        password,
        is_mod,
        Is_admin
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "/signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
