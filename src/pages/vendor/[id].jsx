import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchVendorById } from '@/lib/firebaseHelpers';
import VendorCard from '@/components/VendorCard';

export default function VendorPage() {
  const router = useRouter();
  const { id } = router.query;

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchVendorById(id).then((data) => {
        setVendor(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <p className="p-6">جارٍ التحميل...</p>;
  if (!vendor) return <p className="p-6">لم يتم العثور على المتجر.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{vendor.name}</h1>
      <VendorCard vendor={vendor} />
      <p className="mt-2 text-gray-600">{vendor.description}</p>
    </div>
  );
}
// pages/vendor/[id].jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export default function VendorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchVendor = async () => {
        const vendorDoc = await getDoc(doc(db, "vendors", id));
        if (vendorDoc.exists()) {
          setVendor(vendorDoc.data());
        }

        const q = query(collection(db, "products"), where("vendorId", "==", id));
        const productsSnapshot = await getDocs(q);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      };

      fetchVendor();
    }
  }, [id]);

  if (!vendor) return <div>Loading vendor...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{vendor.name}</h1>
      <p className="text-gray-600">{vendor.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
