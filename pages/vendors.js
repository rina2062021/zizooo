// pages/vendors.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const snapshot = await getDocs(collection(db, "vendors"));
      setVendors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchVendors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl mb-6 font-bold text-center">المتاجر</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vendors.map(vendor => (
          <Link key={vendor.id} href={`/vendor/${vendor.id}`}>
            <a className="border rounded shadow p-4 hover:shadow-lg transition">
              <img
                src={vendor.image || "/placeholder.png"}
                alt={vendor.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{vendor.name}</h2>
              <p>تقييم: {vendor.rating || "غير متوفر"}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

