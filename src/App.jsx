import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ListaJuegos from "./components/Dashboard";
import Barrabuscadora from "./components/BarraBuscadora";
import { AuthProvider } from "../src/context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
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
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/home" element={<ListaJuegos />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
