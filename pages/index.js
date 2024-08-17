"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/Shared";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Fitness Tracker</h1>
      <p className="text-lg mb-8">
        Start your fitness journey today! Log your workouts, track your progress,
        and connect with others in our supportive community.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => router.push("/api/auth/signin")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </div>
  );
}