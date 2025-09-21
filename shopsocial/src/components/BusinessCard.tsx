type Business = {
  id: string;
  name: string;
  category?: string;
  location?: string;
  description?: string;
  photo_url?: string;
  created_at?: string;
};

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="border rounded p-4 shadow bg-white text-black">
      <h3 className="font-bold text-lg mb-1">{business.name}</h3>
      {business.category && <div className="text-sm text-gray-600">{business.category}</div>}
      {business.location && <div className="text-sm text-gray-600">{business.location}</div>}
      {business.description && <div className="mt-2">{business.description}</div>}
      {/* Placeholder for photo, ratings, actions */}
    </div>
  );
}
