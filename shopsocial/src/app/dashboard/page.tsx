"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BusinessCard from "@/components/BusinessCard";
import Link from "next/link";

export default function DashboardPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, category, location, description, photo_url, created_at")
        .eq("owner_id", user.id);
      if (error) setError(error.message);
      else setBusinesses(data || []);
      setLoading(false);
    };
    fetchBusinesses();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="font-bold text-2xl mb-4">Business Dashboard</h1>
      <Link href="/business/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">+ Add Business</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : businesses.length === 0 ? (
        <div>No businesses found.</div>
      ) : (
        <div className="grid gap-4 mt-4">
          {businesses.map(biz => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      )}
    </div>
  );
}
