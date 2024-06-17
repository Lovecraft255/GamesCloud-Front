import React from "react";
import styles from "../estilos/Juego.module.css";

const Juego = ({ data }) => {
  data.map((e) => {
    return (
      <div key={e.id} className={styles["juego-container"]}>
        <img src={e.imagens} />
        <h2>{e.name}</h2>
        <p>{e.description}</p>
        <p>{e.precio}</p>
      </div>
    );
  });
};

export default Juego;
