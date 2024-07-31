import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

function RutaProtegida() {
  const auth = useAuth()

  return auth.isAuth ? <Outlet /> : <Navigate to={"/"} />;
}

export default RutaProtegida;
