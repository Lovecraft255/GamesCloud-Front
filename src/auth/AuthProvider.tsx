import React, { useContext, createContext, useEffect, useState } from "react";
import type { AuthResponse } from "../types/types";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuth: false,
  getAccessToken: () => {},
  saveUser: (dataUser: AuthResponse) => {},
});

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setisAuth] = useState(false);
  const [accessToken, setaccestToken] = useState("");
  const [refreshToken, setrefreshToken] = useState("");

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(dataUser: AuthResponse) {
    setaccestToken(dataUser.body.accessToken);
    setrefreshToken(dataUser.body.refreshToken);
    localStorage.setItem("token", JSON.stringify(dataUser.body.refreshToken));
    setisAuth(true);
  }
  return (
    <AuthContext.Provider value={{ isAuth, getAccessToken, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
