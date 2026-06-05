"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
      <div className="bg-[#161A20] p-10 rounded-3xl border border-white/10 w-[420px]">
        <h1 className="text-4xl font-bold text-white mb-3">
          CineCircle
        </h1>

        <p className="text-gray-400 mb-8">
          Discover, track and share movies with friends.
        </p>

        <button
          onClick={() =>
  signIn("google", {
    callbackUrl: "/",
  })
}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}