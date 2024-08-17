"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 text-sm">&copy; 2024 Fitness Tracker MVP</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/about" className="text-blue-500 hover:underline">
          About
        </Link>
        <Link href="/contact" className="text-blue-500 hover:underline">
          Contact
        </Link>
      </div>
    </footer>
  );
}