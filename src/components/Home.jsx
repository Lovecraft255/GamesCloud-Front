import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import ListaJuegos from "./ListaJuegos";

// Paleta tipo plataforma de juegos (dark + acento esmeralda).
// Solo reescribe variables CSS de Bootstrap, no renombra tus clases.
const GAME_THEME = `
  :root {
    --bs-body-bg: #0b0f1a;
    --bs-body-color: #e8ecf4;
    --bs-primary: #1bc47d;
    --bs-primary-rgb: 27, 196, 125;
    --bs-secondary: #7c5cff;
    --bs-secondary-rgb: 124, 92, 255;
    --bs-dark: #141a2a;
    --bs-dark-rgb: 20, 26, 42;
    --bs-border-color: rgba(255, 255, 255, 0.08);
  }

  body {
    background-color: var(--bs-body-bg);
    color: var(--bs-body-color);
  }

  .game-card {
    padding: 0;
    background: var(--bs-dark);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .game-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.45);
  }
  .game-card .card-img-top {
    height: 180px;
    object-fit: cover;
    background: #0b0f1a;
  }
  .game-price {
    color: var(--bs-primary);
    font-weight: 700;
  }
  .gc-hero {
    background: linear-gradient(180deg, rgba(27,196,125,0.12), transparent);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export default function Home() {
  const [juegos, setJuegos] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3001"}/game`, {
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
      <style>{GAME_THEME}</style>

      <header className="gc-hero text-center position-relative py-4 mb-4">
        <h1 className="mb-3">Bienvenido, {user?.name}</h1>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={logout}>
            Cerrar sesión
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/dashboard")}
          >
            Ir al Dashboard
          </button>
        </div>
      </header>

      <ListaJuegos juegos={juegos} />
    </div>
  );
}
