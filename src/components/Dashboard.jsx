import React, { useEffect, useState } from "react";
import Juego from "./Juego";

const ListaJuegos = () => {


  
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    console.log("PETICIOn");
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
  if (juegos.length != 0) {
    return (
      <div>
        <Juego data={juegos} />
      </div>
    );
  }
};

export default ListaJuegos;
