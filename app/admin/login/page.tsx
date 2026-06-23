"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("The credentials did not match.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(180,150,95,0.22),_transparent_45%),linear-gradient(135deg,_#06070a_0%,_#0b0c10_50%,_#11131a_100%)] px-6 py-16 text-stone-200">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-black/35 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Britha admin</p>
        <h1 className="mt-4 font-serif text-3xl text-stone-100">Enter the chamber</h1>
        <div className="mt-8 space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-stone-100 outline-none" />
          <input name="password" type="password" placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-stone-100 outline-none" />
        </div>
        {error ? <p className="mt-4 text-sm text-amber-300">{error}</p> : null}
        <button type="submit" className="mt-8 w-full rounded-2xl bg-stone-100 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-stone-900">Sign in</button>
      </form>
    </div>
  );
}
