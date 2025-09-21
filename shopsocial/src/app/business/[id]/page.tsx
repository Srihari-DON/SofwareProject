import { supabase } from "@/lib/supabaseClient";
import BusinessCard from "@/components/BusinessCard";
import Link from "next/link";

export default async function BusinessDetailsPage({ params }: { params: { id: string } }) {
  const { data: business, error } = await supabase
    .from("businesses")
    .select("id, name, category, location, description, photo_url, created_at")
    .eq("id", params.id)
    .single();

  if (error || !business) {
    return <div className="p-8 text-red-500">Business not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link href="/feed" className="text-blue-500 hover:underline">← Back to Feed</Link>
      <BusinessCard business={business} />
      {/* Reviews and actions will go here */}
      <div className="mt-6">
        <h2 className="font-bold text-lg mb-2">Reviews</h2>
        <div className="text-gray-500">(Reviews UI coming soon)</div>
      </div>
    </div>
  );
}
