const fs = require("fs");
const path = require("path");

const foldersToCreate = [
  "app/login",
  "app/signup",
  "app/dashboard/customer",
  "app/dashboard/vendor",
  "app/dashboard/admin",
  "components",
  "features/auth",
  "features/orders",
  "features/wallet",
  "lib",
  "public",
  "styles"
];

// تحديد الملفات الشائعة التي ظهرت ضمن `tree.txt`
const moveMap = [
  // ملفات Firebase
  { from: "firebase.js", to: "lib/firebase.js" },
  { from: "firebase-config.js", to: "lib/firebase.js" },

  // مكونات React
  { from: "Navbar.jsx", to: "components/Navbar.jsx" },
  { from: "Footer.jsx", to: "components/Footer.jsx" },
  { from: "OrderCard.jsx", to: "components/OrderCard.jsx" },
  { from: "RestaurantCard.jsx", to: "components/RestaurantCard.jsx" },

  // صفحات لوحة التحكم
  { from: "customer_dashboard.jsx", to: "app/dashboard/customer/page.js" },
  { from: "vendor_dashboard.jsx", to: "app/dashboard/vendor/page.js" },
  { from: "admin_dashboard.jsx", to: "app/dashboard/admin/page.js" },

  // صفحات تسجيل الدخول
  { from: "login.jsx", to: "app/login/page.js" },
  { from: "signup.jsx", to: "app/signup/page.js" },

  // ملفات CSS
  { from: "styles.css", to: "styles/globals.css" },
];

function ensureFolders() {
  foldersToCreate.forEach((folder) => {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log("📁 أنشئ المجلد:", folder);
    }
  });
}

function moveFiles() {
  moveMap.forEach(({ from, to }) => {
    const fromPath = path.join(__dirname, from);
    const toPath = path.join(__dirname, to);
    if (fs.existsSync(fromPath)) {
      const toDir = path.dirname(toPath);
      if (!fs.existsSync(toDir)) fs.mkdirSync(toDir, { recursive: true });
      fs.renameSync(fromPath, toPath);
      console.log(`✅ نقل ${from} ➜ ${to}`);
    } else {
      console.log(`⚠️ لم يتم العثور على الملف: ${from}`);
    }
  });
}

// تنفيذ المهام
console.log("\n🚀 بدء تنظيم ملفات مشروعك...");
ensureFolders();
moveFiles();
console.log("\n🎉 تم التنظيم بنجاح! لا تنسَ تحديث المسارات داخل الكود.\n");