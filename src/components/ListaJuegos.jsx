import React from "react";
import Juego from "./Juego";

const ListaJuegos = ({ juegos }) => {
  return (
    <div className="container-fluid px-2">
      <div className="row g-0 justify-content-center">
        <Juego juegos={juegos} />
      </div>
    </div>
  );
};

export default ListaJuegos;
