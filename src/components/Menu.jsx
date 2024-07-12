import React from "react";
import styles from "../estilos/Menu.module.css";
import { Link } from "react-router-dom";

const links = [
  {
    name: "SignIn",
    href: "/singnIn",
  },
  {
    name: "Home",
    href: "/home",
  },
];

function Menu() {
  return (
    <div>
      {links.map((x) => (
        <Link key={x.name} to={x.href}>
          {x.name}
        </Link>
      ))}
    </div>

    /*<div className={styles["menu-container"]}>
      <nav className={styles.menu}>
        <ul>
          <li>Tienda</li>
          <li>Mis Juegos</li>
          <li>Nombre del Perfil</li>
        </ul>
      </nav>
    </div>*/
  );
}

export default Menu;
