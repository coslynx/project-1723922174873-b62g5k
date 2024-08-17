"use client";

import { useSession, signOut } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    // Redirect to the login page after logout
    // window.location.href = "/";
  };

  if (!session) {
    return null;
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  );
}