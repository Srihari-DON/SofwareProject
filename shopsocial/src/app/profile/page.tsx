"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Not logged in");
        setLoading(false);
        return;
      }
      let { data, error } = await supabase
        .from("user_profiles")
        .select("id, username, full_name, avatar_url, role")
        .eq("id", user.id)
        .single();
      if (error && error.code === 'PGRST116') { // No rows found
        // Auto-create user profile
        const { error: insertError } = await supabase.from("user_profiles").insert([
          { id: user.id, role: "user" }
        ]);
        if (insertError) {
          setError(insertError.message);
          setLoading(false);
          return;
        }
        // Try fetching again
        ({ data, error } = await supabase
          .from("user_profiles")
          .select("id, username, full_name, avatar_url, role")
          .eq("id", user.id)
          .single());
      }
      if (error) setError(error.message);
      else {
        setProfile(data);
        setFullName(data?.full_name || "");
        setAvatarUrl(data?.avatar_url || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);
    const { error } = await supabase
      .from("user_profiles")
      .update({ full_name: fullName, avatar_url: avatarUrl })
      .eq("id", profile.id);
    if (error) setError(error.message);
    else setSuccess("Profile updated!");
    setSaving(false);
  };

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!profile) return <div className="p-8">No profile found.</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="font-bold text-2xl mb-4">Your Profile</h2>
      <div className="mb-4 flex items-center gap-4">
        <img
          src={avatarUrl || `https://ui-avatars.com/api/?name=${profile.full_name || profile.id}`}
          alt="Avatar"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <div className="text-gray-700 font-semibold">{profile.role === "owner" ? "Business Owner" : "User"}</div>
          <div className="text-gray-500 text-sm">{profile.id}</div>
        </div>
      </div>
      <form onSubmit={handleSave} className="flex flex-col gap-3">
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={avatarUrl}
          onChange={e => setAvatarUrl(e.target.value)}
          placeholder="Avatar URL (optional)"
          className="border p-2 rounded"
        />
        <button type="submit" disabled={saving} className="bg-blue-500 text-white px-4 py-2 rounded">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
      {success && <div className="mt-2 text-green-600 text-sm">{success}</div>}
      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
}
