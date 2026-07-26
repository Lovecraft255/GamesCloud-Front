import React from "react";


const Juego = ({ juegos }) => {
  if (!Array.isArray(juegos)) return null;

  return juegos.map((e) => (
    <div>
      <img src={e.imagens} alt={e.name} />
      <h2>{e.name}</h2>
      <p>{e.descritption}</p>
      <p>{e.precio}</p>
    </div>
  ));
};

export default Juego;
