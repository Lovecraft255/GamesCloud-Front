import React from "react";
import styles from "../estilos/Menu.module.css"

function Menu() {
  return (
    <div className={styles["menu-container"]}>
      <nav className={styles.menu}>
        <ul>
          <li>Tienda</li>
          <li>Mis Juegos</li>
          <li>Nombre del Perfil</li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
