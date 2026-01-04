import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useTokenMonitor } from "../hooks/tokenMonitor";
import apiService from "../services/apiService";

import Juego from "./Juego";

const ListaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState("");

  useTokenMonitor();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading("Cargando...");
    try {
      const response = await apiService.get(
        "http://localhost:3001/game/getgames"
      );
      setData(response.data);
      setJuegos(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching data");
      setData(null);
    } finally {
      setLoading("");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  if (loading) {
    return <div>{loading}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (juegos.length != 0) {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <span className="user-email">({user?.email})</span>
            <button onClick={fetchProtectedData}>Refresh Data</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <main className="dashboard-content">
          {error && <div className="error-message">{error}</div>}
          <div className="user-details">
            <h3>User Information (from JWT)</h3>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
          <div>
            <Juego data={juegos} />
          </div>
          ;
          <div className="data-section">
            <h2>Protected Data</h2>
            {data ? (
              <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </main>
      </div>
    );
  }
};

export default ListaJuegos;
