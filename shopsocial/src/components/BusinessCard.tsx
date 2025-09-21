import { FaMapMarkerAlt, FaStar, FaRegCommentDots, FaPoll } from "react-icons/fa";

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
    <div className="relative flex flex-col md:flex-row items-stretch bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow min-h-[180px]">
      {/* Image or placeholder */}
      <div className="md:w-48 w-full h-40 md:h-auto bg-gray-100 flex items-center justify-center">
        {business.photo_url ? (
          <img src={business.photo_url} alt={business.name} className="object-cover w-full h-full" />
        ) : (
          <span className="text-5xl text-gray-300">🏪</span>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-xl text-gray-900 flex-1 truncate">{business.name}</h3>
            {business.category && (
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold">
                {business.category}
              </span>
            )}
          </div>
          {business.location && (
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FaMapMarkerAlt className="mr-1" />
              <span className="truncate">{business.location}</span>
            </div>
          )}
          {business.description && (
            <div className="text-gray-700 text-sm line-clamp-2 mb-2">{business.description}</div>
          )}
        </div>
        {/* Visual placeholders for future features */}
        <div className="flex items-center gap-4 mt-2">
          {/* Ratings */}
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <span className="text-gray-700 text-xs">4.8</span>
          </div>
          {/* Reviews */}
          <div className="flex items-center gap-1 text-blue-400">
            <FaRegCommentDots />
            <span className="text-gray-700 text-xs">23</span>
          </div>
          {/* Polls */}
          <div className="flex items-center gap-1 text-green-500">
            <FaPoll />
            <span className="text-gray-700 text-xs">Polls</span>
          </div>
          {/* Actions (placeholder) */}
          <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
