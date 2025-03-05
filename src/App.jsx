import React, { useEffect, useState } from "react";
import ListaJuegos from "./components/Dashboard";
import { AuthProvider } from "../src/context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<ListaJuegos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
