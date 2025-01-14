import Menu from "./Menu";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singUp, user, isAuthenticated, errors: registerErrors } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigation("/home");
  }, [isAuthenticated]);

  console.log(user);

  const registarse = handleSubmit(async (values) => {
    singUp(values);
  });

  return (
    <div>
      {registerErrors.map((error, i) => (
        <div key={i}> {error} </div>
      ))}
      <form onSubmit={registarse}>
        <input type="text" {...register("name", { required: true })} />
        {errors.name && <p>Nombre requerido</p>}
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>email requerido</p>}
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>Contraseña requerido</p>}
        <button type="sumbit">Registrarse</button>
      </form>
      <p>
        Ya tenes cuenta? <Link to={"/login"}>Inciar sesion</Link>{" "}
      </p>
    </div>
  );
};

export default Register;
