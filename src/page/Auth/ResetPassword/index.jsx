import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputField from "@/layouts/AdminLayout/components/InputField";
import { useResetPassword } from "@/features/auth/hook";
import { resetPassoword } from "@/services/auth";

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  password_confirmation: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không trùng khớp"),
});

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleResetPassword, resetSending } = useResetPassword();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [tokenError, setTokenError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!token) {
      setTokenError("Liên kết đã hết hạn hoặc không hợp lệ");
    }
  }, [token]);

  const onSubmit = async (data) => {
    if (!token) return;

    setTokenError("");

    const payloadData = {
      token,
      email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    const result = await handleResetPassword(payloadData);

    if (resetPassoword.fulfilled.match(result)) {
      navigate("/login", {
        state: { message: "Tạo mật khẩu mới thành công, vui lòng đăng nhập" },
      });
    } else {
      const errorPayload = result.payload;

      if (typeof errorPayload === "object" && errorPayload !== null) {
        Object.entries(errorPayload).forEach(([field, messages]) => {
          const message = Array.isArray(messages) ? messages[0] : messages;
          setError(field, { type: "server", message });
        });
      } else {
        setTokenError(errorPayload || "Liên kết đã hết hạn hoặc không hợp lệ");
      }
    }
  };

  return (
    <div className="w-full max-w-92.5 mx-auto">
      <h1 className="text-base font-bold text-center text-black dark:text-white mb-2">
        Tạo mật khẩu mới
      </h1>

      {tokenError ? (
        <div className="flex flex-col items-center text-center my-6 gap-4">
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-200 dark:border-red-900 w-full">
            {tokenError}
          </p>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-black dark:text-white hover:underline"
          >
            Gửi lại yêu cầu đặt lại mật khẩu
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-center text-gray-400 dark:text-gray-500 mb-8">
            Nhập mật khẩu mới cho tài khoản của bạn
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputField
              name="password"
              type="password"
              placeholder="Mật khẩu mới"
              register={register}
              control={control}
              error={errors.password}
              autoFocus
            />

            <InputField
              name="password_confirmation"
              type="password"
              placeholder="Xác nhận mật khẩu"
              register={register}
              control={control}
              error={errors.password_confirmation}
            />

            <button
              type="submit"
              disabled={resetSending}
              className="w-full py-3.5 mt-1 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetSending ? "Đang xử lý..." : "Tạo mật khẩu mới"}
            </button>
          </form>
        </>
      )}

      <div className="flex flex-col text-center mt-5">
        <Link
          to="/login"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Quay lại Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;
