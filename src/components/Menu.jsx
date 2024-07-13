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
  { name: "SignUp", href: "/signUp" },
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
  );
}

export default Menu;
