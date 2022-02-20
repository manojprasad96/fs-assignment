import axios from "axios";
const http =  axios.create({
    baseURL: "http://localhost:8080/fs/auth/",
    headers: {
        "Content-type": "application/json"
    }
});

class AuthService {
    signUp = async ({username, password, roles}) => {
        return http.post("/signup", {
            username,
            password,
            roles
        });
    }

    loginUser = async ({username, password}) => {
        const response = await http.post("/login", {
            username,
            password,
        });
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout = () => {
        localStorage.removeItem("user");
    }

}
export default new AuthService();