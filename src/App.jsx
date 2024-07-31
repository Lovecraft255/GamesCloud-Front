import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ListaJuegos from "./components/Dashboard";
import Barrabuscadora from "./components/BarraBuscadora";
import SingIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  const pedirDatos = async (juego) => {
    let url = "http://localhost:3001/game/getgame/";
    url += juego;
    const req = fetch(url);
    req
      .then((res) => res.json())
      .then((game) => {
        console.log(game);
        setJuegos(game);
      });
  };

  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route path="/singnIn" element={<SingIn />} />
          <Route path="/home" element={<ListaJuegos />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
      <Barrabuscadora pedirDatos={pedirDatos} />
    </div>
  );
};

export default App;
