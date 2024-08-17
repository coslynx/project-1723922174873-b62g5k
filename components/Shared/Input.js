"use client";

import { useState } from "react";

export default function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`relative flex flex-col gap-1 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    >
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isFocused ? "ring-blue-500" : ""
        } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}