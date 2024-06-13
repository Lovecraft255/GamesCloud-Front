import React from "react";

const Juego = ({ imagen, nombre, descripcion, precio }) => {
  return (
    <div>
      <img src={imagen} alt={nombre} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p>Precio: {precio}</p>
    </div>
  );
};

export default Juego;
