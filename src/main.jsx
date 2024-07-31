import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { useState, useEffect } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./components/SingIn.jsx";
import SignUp from "./components/SignUp.jsx";
import ListaJuegos from "./components/Dashboard.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import AuthProvider from "./auth/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <RutaProtegida />,
    children: [{ path: "/home", element: <ListaJuegos /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
