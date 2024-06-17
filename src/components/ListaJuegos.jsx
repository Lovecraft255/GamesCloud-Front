import React from "react";
import Juego from "./Juego";
import styles from "../estilos/Listajuego.module.css";

const ListaJuegos = (juegos) => {
  return (
    <div className={styles["Lista-container"]}>
      <Juego data={juegos} />
    </div>
  );
};

export default ListaJuegos;
