import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ListaJuegos from "./components/Dashboard";
import Barrabuscadora from "./components/BarraBuscadora";
import SingIn from "./components/SingIn";
import SignUp from "./components/SignUp";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  

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
