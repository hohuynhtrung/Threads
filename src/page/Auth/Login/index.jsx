import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "@/schemas/authSchema";
import InputField from "@/layouts/AdminLayout/components/InputField";
import { useLogin } from "@/features/auth/hook";
import { login } from "@/services/auth";

function Login() {
  const navigate = useNavigate();
  const { login: doLogin, loggingIn } = useLogin();
  const location = useLocation();
  const isVerified = location.state?.verified;

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await doLogin({
      login: data.account,
      password: data.password,
    });
    if (login.fulfilled.match(result)) {
      navigate("/");
      return;
    }
    setError("account", { type: "server", message: "" });
    setError("password", {
      type: "server",
      message: "Tài khoản hoặc mật khẩu không chính xác.",
    });
  };

  return (
    <div className="w-full max-w-92.5 mx-auto">
      <h1 className="text-base font-bold text-center text-black dark:text-white mb-8">
        Đăng nhập bằng tài khoản Instagram
      </h1>

      {isVerified && (
        <div className="my-4 p-3.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl text-center">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Đã xác minh tài khoản thành công. Vui lòng đăng nhập.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputField
          name="account"
          placeholder="Số điện thoại hoặc email"
          register={register}
          error={errors.account}
          control={control}
          autoFocus
        />

        <InputField
          name="password"
          type="password"
          placeholder="Mật khẩu"
          register={register}
          control={control}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={loggingIn}
          className="w-full py-3.5 mt-1 bg-black text-white font-semibold text-sm rounded-2xl hover:bg-gray-800 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
        >
          {loggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <div className="flex flex-col text-center mt-5">
        <Link
          to="/forgot-password"
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-4"
        >
          Quên mật khẩu?
        </Link>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Bạn có tài khoản chưa?{" "}
          <Link
            to="/register"
            className="text-black text-sm font-semibold hover:underline ml-1"
          >
            Đăng ký
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
