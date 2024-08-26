import React, { useContext, createContext, useEffect, useState } from "react";
import type { AuthResponse, AccessTokenResponse, User } from "../types/types";
import { API_URL } from "./consts";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuth: false,
  getAccessToken: () => {},
  saveUser: (dataUser: AuthResponse) => {},
  getRefreshToken: () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setisAuth] = useState(false);
  const [accessToken, setaccestToken] = useState("");
  const [refreshToken, setrefreshToken] = useState("");
  const [user, setUser] = useState<User>();

  useEffect(() => {}, []);

  async function ReqnewAccessToken(token: string) {
    try {
      const req = await fetch(`${API_URL}/token/refresh_token`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        method: "POST",
      });

      if (req.ok) {
        const json = (await req.json()) as AccessTokenResponse;
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(req.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getUserInfo(accessToken: string) {
    try {
      const req = await fetch(`${API_URL}/user/getuser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });

      if (req.ok) {
        const json = (await req.json()) as AccessTokenResponse;
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(req.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function checkAuth() {
    if (accessToken) {
    } else {
      const token = getRefreshToken();

      if (token) {
        const newAccessToken = await ReqnewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
          }
        }
      }
    }
  }

  function saveSessionInfo(
    userInfo: User,
    accessToken: string,
    refreshToken: string
  ) {
    setaccestToken(accessToken);
    setUser(userInfo);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setisAuth(true);
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken(): string | null {
    const token = localStorage.getItem("token");
    if (token) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }
    return null;
  }

  function saveUser(dataUser: AuthResponse) {
    saveSessionInfo(
      dataUser.body.user,
      dataUser.body.accessToken,
      dataUser.body.refreshToken
    );
  }
  return (
    <AuthContext.Provider
      value={{ isAuth, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
