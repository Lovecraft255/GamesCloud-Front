import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";

// Misma paleta que Home/Juego/ListaJuegos/Dashboard: dark + acento esmeralda.
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
    <div className="home-container">
      <style>{GAME_THEME}</style>

      <header className="gc-hero text-center position-relative py-4 mb-4">
        <h1 className="mb-3">Registrarse</h1>
      </header>

      <div className="container-fluid px-2">
        <div
          className="card game-panel shadow-sm mx-auto"
          style={{ maxWidth: "420px" }}
        >
          <div className="card-body">
            <form onSubmit={registrarse}>
              <div className="mb-3 text-start">
                <label className="form-label text-secondary">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label text-secondary">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>
            <p className="text-secondary mt-3 mb-0">
              ¿Ya tenés cuenta?{" "}
              <Link to="/signin" className="text-decoration-none">
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
