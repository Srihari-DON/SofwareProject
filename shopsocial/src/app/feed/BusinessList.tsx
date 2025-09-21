"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BusinessCard from "@/components/BusinessCard";

export default function BusinessList() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, category, location, description, photo_url, created_at");
      if (error) setError(error.message);
      else setBusinesses(data || []);
      setLoading(false);
    };
    fetchBusinesses();
  }, []);

  if (loading) return <div>Loading businesses...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (businesses.length === 0) return <div>No businesses found.</div>;

  return (
    <div className="grid gap-4 mt-4">
      {businesses.map(biz => (
        <BusinessCard key={biz.id} business={biz} />
      ))}
    </div>
  );
}
