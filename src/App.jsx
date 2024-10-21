import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ListaJuegos from "./components/Dashboard";
import Barrabuscadora from "./components/BarraBuscadora";
//import Login from "./components/Login";
import Register from "./components/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<ListaJuegos />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
