"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Insert into user_profiles with role
    if (data.user) {
      const { error: profileError } = await supabase.from("user_profiles").insert([
        { id: data.user.id, role }
      ]);
      if (profileError) setError(profileError.message);
    }
  setMessage("Check your email for a confirmation link!");
  setLoading(false);
  // Optionally, redirect to login page after sign up
  setTimeout(() => router.push("/auth"), 1500);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setMessage("Logged in!");
      setTimeout(() => router.push("/feed"), 1000);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">Sign Up / Log In</h2>
      <form className="flex flex-col gap-2">
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="owner"
              checked={role === "owner"}
              onChange={() => setRole("owner")}
            />
            Business Owner
          </label>
        </div>
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
