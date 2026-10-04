import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useVerifyEmail } from "@/features/auth/hook";
import { verifyEmail } from "@/services/auth";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleVerifyEmail } = useVerifyEmail() || {};

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const executeVerification = async () => {
      if (!token) {
        setErrorMessage("Liên kết đã hết hạn hoặc không hợp lệ.");
        setLoading(false);
        return;
      }

      const result = await handleVerifyEmail({ token });

      if (verifyEmail.fulfilled.match(result)) {
        // Kích hoạt thành công -> chuyển về login kèm state
        navigate("/login", {
          state: { verified: true },
          replace: true,
        });
      } else {
        setErrorMessage(
          typeof result.payload === "string"
            ? result.payload
            : "Liên kết đã hết hạn hoặc không hợp lệ.",
        );
        setLoading(false);
      }
    };

    executeVerification();
  }, [token]);

  return (
    <div className="w-full max-w-92.5 mx-auto text-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="w-8 h-8 border-3 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Đang xác minh...
          </p>
        </div>
      ) : (
        errorMessage && (
          <div className="flex flex-col items-center gap-6 my-4">
            <p className="w-full text-sm text-red-500 bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-200 dark:border-red-900">
              {errorMessage}
            </p>

            <Link
              to="/login"
              className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-[0.99] transition-all cursor-pointer inline-block text-center"
            >
              Đi tới trang đăng nhập
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default VerifyEmail;
