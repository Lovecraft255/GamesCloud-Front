import React from "react";
import Juego from "./Juego";
import styles from "../estilos/Listajuego.module.css";

const ListaJuegos = () => {
  const url = "http://localhost:3001/game/getgames";
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={styles["Lista-container"]}>
      <Juego data={data} />
    </div>
  );
};

export default ListaJuegos;
