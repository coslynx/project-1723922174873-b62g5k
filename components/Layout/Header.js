"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button, LoadingSpinner } from "@/components/Shared";

export default function Header() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <header className="bg-gray-100 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Fitness Tracker
          </Link>
          <div>
            <LoadingSpinner />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Fitness Tracker
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className="flex items-center gap-2">
              <p className="text-gray-800">{session.user.name}</p>
              <Button variant="secondary" href="/dashboard">
                Dashboard
              </Button>
              <Button variant="primary" href="/api/auth/signout">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button variant="primary" href="/api/auth/signin">
                Login
              </Button>
              <Button variant="secondary" href="/register">
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}