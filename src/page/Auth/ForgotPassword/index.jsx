import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputField from "@/layouts/AdminLayout/components/InputField";
import { forgotPassword } from "@/services/auth";
import { useForgotPassword } from "@/features/auth/hook";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không đúng định dạng"),
});

function ForgotPassword() {
  const { handleForgotPassword, forgotSending } = useForgotPassword();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setSuccessMessage("");
    setErrorMessage("");

    const result = await handleForgotPassword(data);

    if (forgotPassword.fulfilled.match(result)) {
      setSuccessMessage(
        "Liên kết đặt lại mật khẩu đã được gửi tới email của bạn.",
      );
    } else {
      const errorPayload = result.payload;
      if (typeof errorPayload === "object" && errorPayload !== null) {
        Object.entries(errorPayload).forEach(([field, messages]) => {
          const message = Array.isArray(messages) ? messages[0] : messages;
          setError(field, { type: "server", message });
        });
      } else {
        setErrorMessage(errorPayload || "Đã xảy ra lỗi. Vui lòng thử lại sau");
      }
    }
  };

  return (
    <div className="w-full max-w-92.5 mx-auto">
      <h1 className="text-base font-bold text-center text-black dark:text-white mb-2">
        Quên mật khẩu
      </h1>

      <p className="text-sm text-center text-gray-400 dark:text-gray-500 mb-8">
        Nhập email của bạn để nhận liên kết đặt lại mật khẩu
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          error={errors.email}
          control={control}
          autoFocus
        />

        {successMessage && (
          <div className="flex items-start gap-2 px-3.5 py-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl">
            <span className="text-blue-500 mt-0.5 shrink-0">ℹ</span>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {successMessage}
            </p>
          </div>
        )}

        {errorMessage && (
          <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-950/30 p-3 rounded-2xl border border-red-200 dark:border-red-900">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={forgotSending || Boolean(successMessage)}
          className="w-full py-3.5 mt-1 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {forgotSending ? "Đang gửi..." : "Đặt lại mật khẩu"}
        </button>
      </form>

      <div className="flex flex-col text-center mt-5">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Nhớ mật khẩu rồi?{" "}
          <Link
            to="/login"
            className="text-black dark:text-white text-sm font-semibold hover:underline ml-1"
          >
            Đăng nhập
          </Link>
        </span>
      </div>
    </div>
  );
}

export default ForgotPassword;
