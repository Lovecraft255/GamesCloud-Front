import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Error de autorizacion");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const singUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("ERRROR", error);
      setErrors((oldstate) => [...oldstate, error.response.data]);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log("RES", res);
    } catch (error) {
      console.log("ERROR", error);

      setErrors((oldstate) => [...oldstate, error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{ singUp, signIn, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
