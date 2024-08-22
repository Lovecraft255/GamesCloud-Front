import { useState } from "react";
import Menu from "./Menu";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/consts";
import { AuthResponse, AuthResponseError } from "../types/types";
import React from "react";

const LogIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const goTo = useNavigate();
  const auth = useAuth();

  async function logearse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const req = await fetch(`${API_URL}/user/singin`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name: name, password: password }),
      });
      if (req.ok) {
        console.log("Sesión iniciada");
        setError("");
        const json = (await req.json()) as AuthResponse;
        console.log(json.body);

        if (json.body.accessToken && json.body.refreshToken) {
          console.log("Entrarom");

          auth.saveUser(json);
        }
      } else {
        console.log("Algo salió mal");
        const json = (await req.json()) as AuthResponseError;
        setError(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuth == true) {
    return <Navigate to="/home" />;
  }

  return (
    <Menu>
      <section>
        <form onSubmit={logearse} action="/signin" method="post">
          {error && <div className="errorMessage">{error}</div>}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Iniciar Sesión</button>
        </form>
      </section>
    </Menu>
  );
};

export default LogIn;
