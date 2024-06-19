import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Juego from "./Juego";

const Barrabuscadora = ({ pedirDatos }) => {
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    console.log("El usuario busco ", e.target.value);
  };

  const handleClick = () => {
    pedirDatos(busqueda);
  };

  return (
    <div className="containerInput">
      <input
        className="form-control"
        placeholder="ingrese el nombre del juego que desea"
        onChange={handleChange}
      />
      <button onClick={handleClick} className="btn btn-success">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Barrabuscadora;
