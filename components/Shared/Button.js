"use client";

import { useState } from "react";

export default function Button({
  type = "button",
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  fullWidth = false,
  isLoading = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const buttonClass = `
    ${fullWidth ? "w-full" : ""}
    px-4
    py-2
    rounded-md
    font-medium
    text-white
    ${
      variant === "primary"
        ? "bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        : variant === "secondary"
        ? "bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-gray-300"
        : variant === "danger"
        ? "bg-red-500 hover:bg-red-700 focus:ring-2 focus:ring-red-300"
        : ""
    }
    ${isHovered ? "bg-opacity-90" : "bg-opacity-100"}
    ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={buttonClass}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}