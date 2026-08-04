import React from "react";

const Juego = ({ juegos }) => {
  if (!Array.isArray(juegos)) return null;

  return juegos.map((e) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={e.id}>
      <div className="card h-100 game-card shadow-sm">
        <img
          src={e.imagens}
          alt={e.name}
          className="card-img-top"
        />
        <div className="card-body d-flex flex-column">
          <h2 className="h5 card-title">{e.name}</h2>
          <p className="card-text text-secondary flex-grow-1">
            {e.descritption}
          </p>
          <p className="game-price mb-0">{e.precio}</p>
        </div>
      </div>
    </div>
  ));
};

export default Juego;
