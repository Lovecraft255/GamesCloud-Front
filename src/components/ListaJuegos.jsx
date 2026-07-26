import React from "react";
import Juego from "./Juego";


const ListaJuegos = ({ juegos }) => {
  return (
    <div >
      <Juego juegos={juegos} />
    </div>
  );
};

export default ListaJuegos;
