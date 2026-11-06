// src/App.jsx
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import { storeItems } from "./data/storeItems";
import "./App.css";

function StoreContent() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Zero props passed to Navbar or CartSidebar! */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            {t.heroTitle}
          </h1>
          <p
            className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            {t.heroDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storeItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <CartSidebar />
    </div>
  );
}

export default function App() {
  return (
    // Wrap the entire app inside our Context Providers
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <StoreContent />
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
