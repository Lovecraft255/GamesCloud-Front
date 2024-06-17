import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ListaJuegos from "./components/ListaJuegos";
import Barrabuscadora from "./components/BarraBuscadora";

const App = () => {
  const [juegos, setJuegos] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/game/getgames")
      .then((res) => res.json())
      .then((data) => {
        setJuegos([data]);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Menu />
      <ListaJuegos juegos={juegos} />
    </div>
  );
};

export default App;
