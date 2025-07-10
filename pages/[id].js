import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/router';

export default function VendorPage() {
  const router = useRouter();
  const { id } = router.query;
  const [vendorData, setVendorData] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchVendor() {
      try {
        const docRef = doc(db, "vendors", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVendorData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching vendor:', error);
      }
    }

    fetchVendor();
  }, [id]);

  if (!vendorData) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{vendorData.name}</h1>
      <img
        src={vendorData.image || '/placeholder.jpg'}
        alt={vendorData.name}
        className="w-full max-w-md h-60 object-cover rounded-md mb-4"
      />
      <p className="text-gray-700">{vendorData.description}</p>
    </div>
  );
}
