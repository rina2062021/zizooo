export default function VendorCard({ vendor }) {
  return (
    <div className="border rounded-xl shadow-sm p-4">
      <h3 className="font-semibold text-lg">{vendor.name}</h3>
      <p className="text-sm text-gray-600">{vendor.category}</p>
    </div>
  );
}
// components/VendorCard.jsx
import Link from "next/link";

export default function VendorCard({ vendor }) {
  return (
    <Link href={`/vendor/${vendor.id}`}>
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
        <img
          src={vendor.image || "/store-placeholder.png"}
          alt={vendor.name}
          className="w-full h-40 object-cover rounded"
        />
        <h2 className="text-lg font-bold mt-2">{vendor.name}</h2>
        <p className="text-sm text-gray-500">{vendor.description?.slice(0, 60)}...</p>
      </div>
    </Link>
  );
}
