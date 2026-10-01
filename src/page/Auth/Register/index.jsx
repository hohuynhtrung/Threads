import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/authSchema";
import InputField from "@/layouts/AdminLayout/components/InputField";
import { useRegister } from "@/features/auth/hook";
import { register as registerAction } from "@/services/auth";

const translateError = (message) => {
  const map = {
    "The username has already been taken.": "Tên đăng nhập đã được sử dụng",
    "The email has already been taken.": "Email đã được sử dụng",
    "The password field must be at least 8 characters.":
      "Mật khẩu phải có ít nhất 8 ký tự",
  };
  return map[message] || message;
};

function Register() {
  const navigate = useNavigate();
  const { register: doRegister, registering } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const result = await doRegister(data);

    if (registerAction.fulfilled.match(result)) {
      navigate("/");
      return;
    }

    const backendErrors = result.payload;

    if (backendErrors && typeof backendErrors === "object") {
      Object.entries(backendErrors).forEach(([field, messages]) => {
        const rawMessage = Array.isArray(messages) ? messages[0] : messages;
        setError(field, {
          type: "server",
          message: translateError(rawMessage),
        });
      });
    }
  };

  return (
    <div className="w-full max-w-92.5 mx-auto">
      <h1 className="text-base font-bold text-center text-black dark:text-white mb-8">
        Đăng ký tài khoản mới
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputField
          name="username"
          placeholder="Tên người dùng"
          register={registerField}
          control={control}
          error={errors.username}
          autoFocus
        />

        <InputField
          name="email"
          type="email"
          placeholder="Email"
          control={control}
          register={registerField}
          error={errors.email}
        />

        <InputField
          name="password"
          type="password"
          placeholder="Mật khẩu"
          register={registerField}
          control={control}
          error={errors.password}
        />

        <InputField
          name="password_confirmation"
          type="password"
          placeholder="Xác nhận mật khẩu"
          register={registerField}
          control={control}
          error={errors.password_confirmation}
        />

        <button
          type="submit"
          disabled={registering}
          className="w-full py-3.5 mt-1 bg-black dark:bg-white dark:text-black text-white font-semibold text-sm rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {registering ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <div className="flex flex-col text-center mt-5">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-black dark:text-white font-semibold hover:underline ml-1"
          >
            Đăng nhập
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
