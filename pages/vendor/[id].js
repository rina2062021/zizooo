import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function VendorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchVendor = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const docRef = doc(db, "vendors", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setVendor(docSnap.data());
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">جارٍ التحميل...</p>
      </div>
    );

  if (notFound)
    return (
      <div className="max-w-md mx-auto p-6 mt-20 bg-red-50 border border-red-300 rounded text-center">
        <p className="text-red-600 font-semibold mb-4">المتجر غير موجود أو تم حذفه.</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          رجوع
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold transition flex items-center"
      >
        ← رجوع
      </button>

      <h1 className="text-4xl font-bold mb-4">{vendor.name}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={vendor.image || "/placeholder.png"}
          alt={vendor.name}
          className="w-full md:w-1/2 h-64 object-cover rounded shadow"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />

        <div className="md:flex-1">
          <p className="mb-4 text-gray-700 leading-relaxed">
            {vendor.description || "لا يوجد وصف لهذا المتجر."}
          </p>

          <p className="text-lg font-semibold">
            التقييم:{" "}
            <span className="text-yellow-500">
              {vendor.rating !== undefined ? vendor.rating : "غير متوفر"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
