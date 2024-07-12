import React, { useState } from "react";

const LogIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const logearse = async (e) => {
    e.preventDefault();
    if (name === "" && password === "") {
      setError(true);
      return;
    } else {
      let url = "http://localhost:3001/user/singin";
      const req = fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
        method: "POST",
        body: JSON.stringify({ name: name, password: password }),
      });
      req
        .then((res) => res.json())
        .then((user) => {
          console.log(user);
          {
            <p>Inicio de sesion correcto</p>;
          }
        });
    }
  };

  return (
    <section>
      <form onSubmit={logearse} action="/singin" method="get">
        <input
          type="text"
          name="nombreL"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          name="passwordL"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Iniciar Sesion</button>
      </form>
      {error && <p>Los 2 campos son obligatorios</p>}
    </section>
  );
};

export default LogIn;
