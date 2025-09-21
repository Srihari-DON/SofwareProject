"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddBusinessForm({ onBusinessAdded }: { onBusinessAdded?: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.from("businesses").insert([
      { name, category, location, description }
    ]);
    if (error) setError(error.message);
    else {
      setSuccess("Business added!");
      setName(""); setCategory(""); setLocation(""); setDescription("");
      if (onBusinessAdded) onBusinessAdded();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4 max-w-md mx-auto flex flex-col gap-2 bg-white text-black">
      <h2 className="font-bold text-lg mb-2">Add a Business</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 rounded" required />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="border p-2 rounded" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="border p-2 rounded" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded" />
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">{loading ? "Adding..." : "Add Business"}</button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
    </form>
  );
}
