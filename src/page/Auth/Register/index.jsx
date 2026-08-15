import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/authSchema";
import InputField from "@/layouts/AdminLayout/components/InputField";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <div className="w-full max-w-92.5 mx-auto">
      <h1 className="text-base font-bold text-center text-black mb-8">
        Register a new account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputField
          name="username"
          placeholder="Username"
          register={register}
          error={errors.username}
        />

        <InputField
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          error={errors.email}
        />

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />

        <InputField
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          register={register}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full py-3.5 mt-1 bg-black text-white font-semibold text-sm rounded-2xl hover:bg-gray-800 active:scale-[0.99] transition-all cursor-pointer"
        >
          Register
        </button>
      </form>

      <div className="flex flex-col text-center mt-5">
        <span className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline ml-1"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
