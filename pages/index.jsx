import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vendors'));
        const vendorList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVendors(vendorList);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div>
      <h1>المتاجر</h1>
      {vendors.map(vendor => (
        <div key={vendor.id}>
          <h2>{vendor.name}</h2>
          <p>{vendor.description}</p>
        </div>
      ))}
    </div>
  );
}

