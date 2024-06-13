import React, { useState } from "react";
import Menu from "./components/Menu";
import ListaJuegos from "./components/ListaJuegos";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Menu />
      <ListaJuegos />
    </div>
  );
};

export default App;
