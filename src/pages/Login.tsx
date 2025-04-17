import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { UseAuth } from "@/context/AuthProvider";
import { Link } from "react-router";
import { useNavigate } from "react-router";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { login } = UseAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate()
  

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    setErrorMessage("");
    const success = await login(data);
    setLoading(false);

    if (success) {
      console.log("successfully login", success);
      navigate("/")
    } else {
      setErrorMessage("Invalid Email or password");
    }
  };

  return (
    <div className="text-white w-[80vw] md:w-[30vw] mx-auto mt-12 border border-primary rounded-lg p-6">
      <h1 className="text-lg md:text-3xl  text-center font-medium mb-8">
        Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <p className="text-red-600" role="alert">
            Email is required.
          </p>
        )}
        <Input
          type="password"
          placeholder="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p className="text-red-600" role="alert">
            Password is required
          </p>
        )}
        <Input
          className="w-30 mx-auto mt-2 hover:bg-primary cursor-pointer"
          type="submit"
          value={loading? "Logging in" : "Login"}
          disabled={loading}
        />
        <p className="text-center font-medium mt-2">Don't have an account ? <Link to="/signup"><span className="underline">Sign up</span></Link></p>
        {errorMessage && (<p className="text-red-600">{errorMessage}</p>)}
      </form>
    </div>
  );
};

export default Login;
