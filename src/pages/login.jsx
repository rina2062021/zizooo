import { auth } from "@/firebase/firebaseHelpers";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("تم تسجيل الدخول");
    } catch (error) {
      alert("حدث خطأ: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">تسجيل الدخول</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="border p-2 mt-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mt-2">دخول</button>
    </div>
  );
}
