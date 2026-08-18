function InputField({
  type = "text",
  placeholder,
  register,
  name,
  error,
  autoFocus,
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...register(name)}
        className={`w-full px-4 py-3.5 text-sm bg-[#FAFAFA] dark:bg-zinc-800 border rounded-2xl outline-none placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-zinc-700 transition-all text-black dark:text-white ${
          error
            ? "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30 focus:border-red-500"
            : "border-gray-200 dark:border-zinc-700 focus:border-gray-400 dark:focus:border-zinc-600"
        }`}
      />
      {error && <p className="text-xs text-red-500 px-1">{error.message}</p>}
    </div>
  );
}

export default InputField;
