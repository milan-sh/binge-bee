import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {api} from "../api/api.js";

interface IFormInput {
  email: string;
  fullName: string;
  username: string;
  password: string;
  avatar: FileList | null
  coverImage?: FileList | null
}

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate()


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const formData = new FormData() //create a new formData object
      formData.append("email", data.email)
      formData.append("fullName", data.fullName)
      formData.append("username", data.username)
      formData.append("password", data.password)

      if(data.avatar && data.avatar[0]){
        formData.append("avatar", data.avatar[0])
      }

      if(data.coverImage && data.coverImage[0]){
        formData.append("converImage", data.coverImage[0])
      }

      const response = await api.post("/api/v1/users/register", formData, {headers: {
        "Content-Type": "multipart/form-data", // Important for sending files
      }});
      
      if (response) {
        // console.log("successfully created account", response.data);
        navigate("/login")
      }
    } catch (error:any) {
      setLoading(false);
      console.error("Registration failed:", error.response?.data);
      // Extract the error message from the backend response
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white w-[80vw] md:w-[40vw] mx-auto mt-2 border border-primary rounded-lg p-6">
      <h1 className="text-lg md:text-3xl  text-center font-medium mb-8">
        Create Account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <Input
          placeholder="email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email?.type === "required" && (
          <p className="text-red-600">Email is required</p>
        )}
        <Input
          placeholder="Full Name"
          type="text"
          {...register("fullName", { required: "Full name is required" })}
        />
        {errors.fullName?.type === "required" && (
          <p className="text-red-600">Full Name is required</p>
        )}
        <Input
          placeholder="username"
          type="text"
          {...register("username", { required: "User name is required" })}
        />
        {errors.username?.type === "required" && (
          <p className="text-red-600">User Name is required</p>
        )}
        <Input
          placeholder="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        <div className="flex items-center gap-x-3">
          <label
            htmlFor="avatar"
            className="text-gray-400 md:text-sm text-xs w-30"
          >
            Avatar:
          </label>
          <Input
            id="avatar"
            placeholder="avatar"
            type="file"
            accept="image/*"
            {...register("avatar", { required: "Avatar file is required" })}
          />
        </div>
        {errors.avatar?.type === "required" && (
          <p className="text-red-600">Avatar file is missing is required</p>
        )}
        <div className="flex items-center gap-x-3">
          <label
            htmlFor="coverImage"
            className="text-gray-400 md:text-sm text-xs w-30"
          >
            Cover Image:
          </label>
          <Input
            id="coverImage"
            placeholder="avatar"
            type="file"
            accept="image/*"
            {...register("coverImage")}
          />
        </div>
        <Input
          className="hover:bg-primary cursor-pointer font-semibold mt-4"
          type="submit"
          value={loading? "Creating Account..." : "Create Account"}
          disabled={loading}
        />
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <p className="text-center font-medium">
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline">login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
