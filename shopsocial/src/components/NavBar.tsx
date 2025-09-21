"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NavBar() {
  const [role, setRole] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoggedIn(false);
        setRole(null);
        return;
      }
      setLoggedIn(true);
      const { data } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      setRole(data?.role || null);
    };
    fetchRole();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 shadow z-50">
      <Link href="/feed" className="text-blue-600 font-semibold hover:underline">Feed</Link>
      <Link href="/profile" className="text-blue-600 font-semibold hover:underline">Profile</Link>
      {role === "owner" && (
        <Link href="/dashboard" className="text-blue-600 font-semibold hover:underline">Dashboard</Link>
      )}
      {loggedIn && (
        <button
          onClick={handleLogout}
          className="text-red-500 font-semibold hover:underline px-2 py-1 rounded"
        >
          Log Out
        </button>
      )}
    </nav>
  );
}
