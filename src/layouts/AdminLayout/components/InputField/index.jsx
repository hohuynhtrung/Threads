import { useState } from "react";
import { useWatch } from "react-hook-form";
import Icons from "@/assets/icons";

function InputField({
  type = "text",
  placeholder,
  register,
  name,
  error,
  autoFocus,
  control,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const inputValue = useWatch({
    name,
    control,
  });

  const hasValue = Boolean(inputValue && inputValue.length > 0);

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="relative w-full flex items-center">
        <input
          type={inputType}
          placeholder={placeholder}
          autoFocus={autoFocus}
          {...register(name)}
          className={`w-full px-4 py-3.5 text-sm bg-[#FAFAFA] dark:bg-zinc-800 border rounded-2xl outline-none placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-zinc-700 transition-all text-black dark:text-white ${
            isPasswordType && hasValue ? "pr-11" : ""
          } ${
            error
              ? "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30 focus:border-red-500"
              : "border-gray-200 dark:border-zinc-700 focus:border-gray-400 dark:focus:border-zinc-600"
          }`}
        />

        {isPasswordType && hasValue && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 hover:opacity-70 transition-opacity p-1 cursor-pointer select-none"
            tabIndex={-1}
          >
            <img
              src={showPassword ? Icons.iconEye : Icons.iconEyeHide}
              alt={showPassword ? "Hide password" : "Show password"}
              className="w-5 h-5 dark:invert opacity-60 hover:opacity-100"
            />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 px-1">{error.message}</p>}
    </div>
  );
}

export default InputField;
