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
        className={`w-full px-4 py-3.5 text-sm bg-[#FAFAFA] border rounded-2xl outline-none placeholder-gray-400 focus:bg-white transition-all ${
          error
            ? "border-red-500 bg-red-50 focus:border-red-500"
            : "border-gray-200 focus:border-gray-400"
        }`}
      />
      {error && <p className="text-xs text-red-500 px-1">{error.message}</p>}
    </div>
  );
}

export default InputField;
