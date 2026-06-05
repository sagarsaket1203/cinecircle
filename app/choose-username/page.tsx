"use client";

import { useState } from "react";

export default function ChooseUsernamePage() {
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
      <div className="bg-[#161A20] border border-white/10 rounded-3xl p-8 w-[500px]">
        <h1 className="text-3xl font-bold text-white">
          Choose Username
        </h1>

        <p className="text-gray-400 mt-2">
          This will be visible to your friends.
        </p>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="sagar"
          className="w-full mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
        />

        <button
  onClick={async () => {
    const res = await fetch("/api/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Username already taken");
    }
  }}
  className="w-full mt-5 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-medium text-white"
>
  Save Username
</button>
      </div>
    </div>
  );
}