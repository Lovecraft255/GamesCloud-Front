import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Juego from "./Juego";

const Barrabuscadora = ({ url, modificarUrl }) => {
  const [busqueda, setBusqueda] = useState("");
  const [game, setGames] = useState([]);
  
  const pedirDatos = async (e) => {
    let url = "http://localhost:3001/game/getgame/";
    url += busqueda;
    const req = fetch(url);
    req
      .then((res) => res.json())
      .then((game) => {
        console.log(game);
        setGames(game);
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    console.log("El usuario busco ", e.target.value);
  };

  return (
    <div className="containerInput">
      <input
        className="form-control"
        placeholder="ingrese el nombre del juego que desea"
        onChange={handleChange}
      />
      <button onClick={pedirDatos} className="btn btn-success">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
    
  );
};

export default Barrabuscadora;
