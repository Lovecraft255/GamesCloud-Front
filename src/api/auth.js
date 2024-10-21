import axios from "axios";

const url = "http://localhost:3001";

export const registerRequest = (user) => axios.post(`${url}/user/signup`, user);
