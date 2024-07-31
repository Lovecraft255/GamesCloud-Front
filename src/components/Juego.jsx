import React from "react";


const Juego = ({ data }) => {
  // data es un objeto, no es un array, por eso no te deja ejecutar el map
  const  juegos  = data;
  
  if (juegos.length != undefined) {
    return juegos.map((e) => {
      return (
        <div key={e.id} className="inline-block mx-10 text-center">
          <img src={e.imagens} />
          <h2>{e.name}</h2>
          <p>{e.description}</p>
          <p>{e.precio}</p>
        </div>
      );
    });
  } else {
    const { id, imagens, name, description, precio } = juegos;

    return (
      <div key={id} className={styles["juego-container"]}>
        <img src={imagens} />
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{precio}</p>
      </div>
    );
  }
};

export default Juego;
