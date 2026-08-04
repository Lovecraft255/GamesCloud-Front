import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

// Misma paleta que Home/Juego/ListaJuegos: dark + acento esmeralda.
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

  .gc-hero {
    background: linear-gradient(180deg, rgba(27,196,125,0.12), transparent);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <style>{GAME_THEME}</style>

      <header className="gc-hero text-center position-relative py-4 mb-4">
        <h1 className="mb-3">Dashboard de {user?.name}</h1>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={logout}>
            Cerrar sesión
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/")}
          >
            Ir al Inicio
          </button>
        </div>
      </header>

      <div className="container-fluid px-2">
        <div className="card game-panel shadow-sm mx-auto" style={{ maxWidth: "760px" }}>
          <div className="card-body text-center">
            <h3 className="h5 mb-0 text-secondary">Contenido del Dashboard</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
