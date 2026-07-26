import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import ListaJuegos from "./ListaJuegos";

export default function Home() {
  const [juegos, setJuegos] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:3001/game", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(setJuegos)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="home-container">
      <header>
        <h1>Welcome, {user.name}</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <ListaJuegos juegos={juegos} />
      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>
    </div>
  );
}
