import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ListaJuegos from "./components/ListaJuegos";
import Barrabuscadora from "./components/BarraBuscadora";
import SingIn from "./components/SingIn";

const App = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/game/getgames")
      .then((res) => res.json())
      .then((data) => {
        setJuegos(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      <Menu />
      <Barrabuscadora pedirDatos={pedirDatos} />
      <ListaJuegos juegos={juegos} />
      <SingIn />
    </div>
  );
};

export default App;
