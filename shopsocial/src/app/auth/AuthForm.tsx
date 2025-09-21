"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setMessage("Check your email for a confirmation link!");
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else setMessage("Logged in!");
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">Sign Up / Log In</h2>
      <form className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <div className="flex gap-2">
          <button onClick={handleSignUp} disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">
            Sign Up
          </button>
          <button onClick={handleSignIn} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
            Log In
          </button>
        </div>
      </form>
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
      {message && <div className="mt-2 text-green-500 text-sm">{message}</div>}
    </div>
  );
}
