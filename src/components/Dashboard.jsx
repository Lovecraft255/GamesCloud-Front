import React, { useEffect, useState } from "react";
import Juego from "./Juego";
import { useAuth } from "../auth/AuthProvider";

const ListaJuegos = () => {
  const auth = useAuth();
  console.log("AAA");

  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    console.log("PETICIOn");
    fetch("http://localhost:3001/game/getgames")
      .then((res) => res.json())
      .then((data) => {
        setJuegos(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (juegos.length != 0) {
    return (
      <div>
        <Juego data={juegos} />
      </div>
    );
  } else {
    console.log("Se esta ejecutando");
    console.log(auth);

    return <div>Dashoard {auth.getUser()?.name || ""}</div>;
  }
};

export default ListaJuegos;
