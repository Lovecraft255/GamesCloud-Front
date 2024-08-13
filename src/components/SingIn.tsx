import { useState } from "react";
import Menu from "./Menu";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/consts";
import { AuthResponseError } from "../types/types";
import React from "react";


const LogIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const goTo = useNavigate();

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
        console.log("Sesion iniciada");
        setError("");
        goTo("/home");
      } else {
        console.log("Algo salio mal");
        const json = (await req.json()) as AuthResponseError;
        setError(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const auth = useAuth();

  if (auth.isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <Menu>
      <section>
        <form onSubmit={logearse} action="/singin" method="post">
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

          <button>Iniciar Sesion</button>
        </form>
        {error && <p>Los 2 campos son obligatorios</p>}
      </section>
    </Menu>
  );
};

export default LogIn;
