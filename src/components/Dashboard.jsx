import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header>
        <h1>{user.name} Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <div>
        <h3>Dashboard here</h3>
      </div>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}
