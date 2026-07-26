import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const API = "http://localhost:3001";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (name, password) => {
    try {
      const res = await fetch(`${API}/user/singin`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.error || "Credenciales invalidas" };
      }

      const loggedInUser = { id: data.user.id, name: data.user.name, token: data.token };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Error de conexion" };
    }
  };

  const register = async (name, password) => {
    try {
      const res = await fetch(`${API}/user/signup`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.error || "Error al registrarse" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: "Error de conexion" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
