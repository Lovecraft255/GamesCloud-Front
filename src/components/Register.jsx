import Menu from "./Menu";
import React from "react";
import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

const LogIn = () => {
  const { register, handleSubmit } = useForm();

  const registarse = handleSubmit(async (values) => {
    const res = await registerRequest(values);
    console.log(res);
  });

  return (
    <div>
      <form onSubmit={registarse}>
        <input type="text" {...register("name", { required: true })} />
        <input type="text" {...register("rol", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <button type="sumbit">Registrarse</button>
      </form>
    </div>
  );
};

export default LogIn;
