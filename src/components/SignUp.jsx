import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const registrarse = async (e) => {
    e.preventDefault();

    if (name === "" && rol === "" && password === "") {
      setError(true);
      return;
    } else {
      let url = "http://localhost:3001/user/signup";
      const req = fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },

        method: "POST",
        body: JSON.stringify({ name: name, rol: rol, password: password }),
      });
      req
        .then((res) => res.json())
        .then((user) => {
          console.log(user);
        });
    }
  };

  return (
    <section>
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
      {error && <p>Todos los campos son obligatorios</p>}
    </section>
  );
};

export default SignUp;
