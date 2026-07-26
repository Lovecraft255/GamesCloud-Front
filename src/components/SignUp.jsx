import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const registrarse = async (e) => {
    e.preventDefault();

    if (name === "" || password === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    const result = await register(name, password);

    if (result.success) {
      navigate("/signin");
    } else {
      setError(result.message);
    }
  };

  return (
    <section>
      <form onSubmit={registrarse}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default SignUp;
