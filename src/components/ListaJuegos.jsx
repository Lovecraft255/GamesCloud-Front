import React from "react";
import Juego from "./Juego";
import styles from "../estilos/Listajuego.module.css";

const ListaJuegos = () => {
  const juegos = [
    {
      imagen: "imagen1.jpg",
      nombre: "Juego 1",
      descripcion: "Descripción del Juego 1",
      precio: 10.99,
    },
    {
      imagen: "imagen2.jpg",
      nombre: "Juego 2",
      descripcion: "Descripción del Juego 2",
      precio: 19.99,
    },
    {
      imagen: "imagen3.jpg",
      nombre: "Juego 3",
      descripcion: "Descripción del Juego 3",
      precio: 14.99,
    },
  ];

  return (
    <div className={styles["Lista-container"]}>
      {juegos.map((juego, index) => (
        <Juego
          key={index}
          imagen={juego.imagen}
          nombre={juego.nombre}
          descripcion={juego.descripcion}
          precio={juego.precio}
        />
      ))}
    </div>
  );
};

export default ListaJuegos;
