import axios from "./axios";

export const registerRequest = (user) => axios.post(`/user/signup`, user);

export const loginRequest = (user) => axios.post(`/user/singin`, user);

export const verifyTokenRequest = () => axios.get("/user/verify");
