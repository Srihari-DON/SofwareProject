"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaBell, FaHome, FaUserFriends, FaPlusSquare, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";

export default function TopNavBar() {
  const [profile, setProfile] = useState<any>(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProfile(null);
        return;
      }
      const { data } = await supabase
        .from("user_profiles")
        .select("id, full_name, avatar_url, role")
        .eq("id", user.id)
        .single();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    }
    if (dropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <nav className="w-full bg-white border-b shadow flex items-center justify-between px-4 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/feed" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <FaHome className="text-2xl" /> ShopSocial
        </Link>
        <Link href="/explore" className="hidden md:inline text-gray-700 hover:text-blue-600 font-medium ml-4">Explore</Link>
        <Link href="/friends" className="hidden md:inline text-gray-700 hover:text-blue-600 font-medium">Friends</Link>
        {profile?.role === "owner" && (
          <Link href="/dashboard" className="hidden md:inline text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link href="/create" className="text-gray-700 hover:text-blue-600 text-2xl" title="Add Post/Business">
          <FaPlusSquare />
        </Link>
        <button className="relative text-gray-700 hover:text-blue-600 text-2xl" title="Notifications">
          <FaBell />
          {/* Notification badge example */}
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span> */}
        </button>
        {profile ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdown(v => !v)} className="flex items-center gap-2 focus:outline-none">
              {profile.avatar_url ? (
                <Image src={profile.avatar_url} alt="avatar" width={32} height={32} className="rounded-full border" />
              ) : (
                <FaUserCircle className="text-3xl text-gray-400" />
              )}
            </button>
            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2"><FaSignOutAlt /> Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth" className="text-blue-600 font-semibold">Log In</Link>
        )}
      </div>
    </nav>
  );
}
