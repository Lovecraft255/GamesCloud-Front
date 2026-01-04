import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3000";

class AuthService {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
    this.accessTokenKey = "null";
  }
  configureAxios() {
    axios.defaults.withCredentials = true;
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      const { accessToken } = response.data;

      if (!accessToken) {
        throw new Error("No access token received");
      }

      this.accessToken = accessToken;
      return this.decodeToken(accessToken);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
  logout() {
    this.accessToken = null;
    this.isRefreshing = null;
    this.failedQueue = [];
    return axios
      .post(`${API_URL}/auth/signout`, {}, { withCredentials: true })
      .catch((error) => {
        throw new Error(error.response?.data?.message || "Logout failed");
      });
  }

  register(username, email, password) {
    return axios.post(
      `${API_URL}/auth/signup`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  decodeToken(token) {
    const tokenToUse = token || this.accessToken;
    if (!tokenToUse) return null;
    try {
      const decoded = jwtDecode(tokenToUse);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        this.accessToken = null;
        return null;
      }
      return {
        id: decoded.sub || decoded.id,
        username: decoded.username,
        email: decoded.email,
        exp: decoded.exp,
        iat: decoded.iat,
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      this.accessToken = null;
      return null;
    }
  }

  getCurrentUser() {
    return this.decodeToken();
  }

  getAccessToken() {
    return this.accessToken;
  }

  isTokenValid(token) {
    const tokenToUse = token || this.accessToken;
    if (!tokenToUse) return true;
    try {
      const decoded = jwtDecode(tokenToUse);
      const currentTime = Date.now() / 1000;
      const bufferTime = 5 * 60;
      return decoded.exp > currentTime + bufferTime;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return false;
    }
  }

  async refreshToken() {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      const { accessToken } = response.data;

      if (accessToken) {
        this.accessToken = accessToken;
        return accessToken;
      }

      throw new Error("No access token received");
    } catch (error) {
      this.accessToken = null;
      throw error;
    }
  }

  async checkAuthStatus() {
    try {
      const respones = await axios.get(`${API_URL}/auth/status`, {
        withCredentials: true,
        headers: this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {},
      });
      if (respones.data.accessToken) {
        this.accessToken = respones.data.accessToken;
      }
      return this.decodeToken();
    } catch (error) {
      console.error("Auth status check failed:", error);
      this.accessToken = null;
      return null;
    }
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  addToQueue(resolve, reject) {
    this.failedQueue.push({ resolve, reject });
  }
}

const authService = new AuthService();

authService.configureAxios();

export default authService;
