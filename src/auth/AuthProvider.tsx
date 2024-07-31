import React, { useContext, createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuth: false,
});

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setisAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
