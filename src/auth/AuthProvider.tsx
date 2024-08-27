import React, { useContext, createContext, useEffect, useState } from "react";
import type { AuthResponse, AccessTokenResponse, User } from "../types/types";
import { API_URL } from "./consts";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuth: false,
  getAccessToken: () => {},
  saveUser: (_dataUser: AuthResponse) => {},
  getRefreshToken: () => {},
  getUser: () => ({} as User | undefined),
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setisAuth] = useState(false);
  const [accessToken, setaccestToken] = useState("");
  const [refreshToken, setrefreshToken] = useState("");
  const [user, setUser] = useState<User>();

  async function ReqnewAccessToken(token: string) {
    try {
      console.log("Peticion de tokenes haciendose");
      const req = await fetch(`${API_URL}/token/refresh_token`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const req = await fetch(`${API_URL}/user/usertoken`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });

      if (req.ok) {
        const json = await req.json();
        if (json.error) {
          throw new Error(json.error);
        }
        console.log(json.body);
        console.log("aaaaaaaaaa");

        return json.body;
      } else {
        throw new Error(req.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function checkAuth() {
    const acessToken = localStorage.getItem("token");

    if (acessToken) {
      console.log("TOken petiocion");

      const token = getRefreshToken();

      console.log(token);

      if (token) {
        console.log("Peticion para el nuevo token");
        const newAccessToken = await ReqnewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo, newAccessToken, token);
          }
        }
      } else {
        console.log("No hay token");
      }
    } else {
      console.log("NO TOKEN");
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
    const tokenData = localStorage.getItem("token");
    console.log(tokenData);
    if (tokenData) {
      const refreshToken = JSON.parse(tokenData);

      setrefreshToken(refreshToken);

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

  function getUser() {
    return user;
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, getAccessToken, saveUser, getRefreshToken, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
