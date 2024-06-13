import React from "react";
import styles from "../estilos/Juego.module.css"

const Juego = ({ imagen, nombre, descripcion, precio }) => {
  return (
    <div className={styles["juego-container"]}>
      <img src={imagen} alt={nombre} />
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p>Precio: {precio}</p>
    </div>
  );
};

export default Juego;
