import React from "react";
import { Link } from "react-router-dom";

const links = [
  {
    name: "SignIn",
    href: "/",
  },
  {
    name: "Home",
    href: "/home",
  },
  { name: "SignUp", href: "/signUp" },
];

interface MenuProps {
  children: React.ReactNode;
}

function Menu({ children }: MenuProps) {
  return (
    <>
      <header className="flex justify-center bg-blue-900 text-gray-300">
        {links.map((x) => (
          <Link
            className="text-center mx-auto text-2xl"
            key={x.name}
            to={x.href}
          >
            {x.name}
          </Link>
        ))}
      </header>
      <main>{children}</main>
    </>
  );
}

export default Menu;
