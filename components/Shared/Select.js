"use client";

import { useState } from "react";

export default function Select({ name, value, onChange, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (e) => {
    onChange(e);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {value || "Select"}
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          {children.map((child) => (
            <li
              key={child.props.value}
              onClick={handleSelect}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              {child}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}