import { useState } from "react";
import Menu from "./Menu";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/consts";
import { AuthResponseError } from "../types/types";
import React from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();
  
  async function registrarse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("PETIOCON");
    try {
      console.log("PETIOCON");
      
      const req = await fetch(`${API_URL}/user/signup`, {
        headers: {
          "Content-Type": "application/json",
        },

        method: "POST",
        body: JSON.stringify({ name: name, rol: rol, password: password }),
      });
      if (req.ok) {
        console.log("usario creado");
        setError("");
        goTo("/");
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

  if (auth.isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <Menu>
      <section>
        <h1>Sign-up</h1>
        {!!!error && <div className="errorMessage">{error}</div>}
        <form onSubmit={registrarse} action="/signup" method="post">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Registrarse</button>
        </form>
      </section>
    </Menu>
  );
}

export default SignUp;
