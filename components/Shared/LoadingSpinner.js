"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="flex justify-center items-center h-full w-full"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      {isLoading && (
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="spinner rounded-full border-t-2 border-gray-500 border-b-2 border-gray-200 w-16 h-16"
        ></motion.div>
      )}
    </div>
  );
}