import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: signErrors = [] } = useAuth(); // Corregí "singinErrors" a "signinErrors"

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    console.log("SIGN ERRORS", signErrors);
  }, [signErrors]);

  return (
    <div>
      {signErrors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={onSubmit}>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <p>email requerido</p>}
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>Contraseña requerida</p>}{" "}
        {/* Corregí "requerido" a "requerida" */}
        <button type="submit">Logearse</button>{" "}
        {/* Corregí "sumbit" a "submit" */}
      </form>
      <p>
        No tenes cuenta? <Link to={"/register"}>Resgistrarse</Link>{" "}
      </p>
    </div>
  );
}

export default Login;
