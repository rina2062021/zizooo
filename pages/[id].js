// pages/product/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>جار التحميل...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl text-green-700 font-semibold mb-4">
        السعر: {product.price} ريال
      </p>
      <p className="mb-6">{product.description}</p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
        أضف إلى السلة
      </button>
    </div>
  );
}

