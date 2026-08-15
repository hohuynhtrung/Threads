import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/authSchema";
import InputField from "@/layouts/AdminLayout/components/InputField";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="w-full max-w-92.5 mx-auto">
      <h1 className="text-base font-bold text-center text-black mb-8">
        Log in with your Instagram account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputField
          name="account"
          placeholder="Username, phone or email"
          register={register}
          error={errors.account}
          autoFocus
        />

        <InputField
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />

        <button
          type="submit"
          className="w-full py-3.5 mt-1 bg-black text-white font-semibold text-sm rounded-2xl hover:bg-gray-800 active:scale-[0.99] transition-all cursor-pointer"
        >
          Log in
        </button>
      </form>

      <div className="flex flex-col text-center mt-5">
        <a
          href="#"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4"
        >
          Forgot password?
        </a>

        <span className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-black text-sm font-semibold hover:underline ml-1"
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
