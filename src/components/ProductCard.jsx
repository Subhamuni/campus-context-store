// src/components/ProductCard.jsx
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function ProductCard({ item }) {
  const { darkMode } = useTheme();
  const { addToCart, cart } = useCart();
  const { lang, t, formatPrice } = useLanguage();

  // Check how many of this item are already in the user's cart
  const itemInCart = cart.find((c) => c.id === item.id);

  // Dynamically pick Khmer or English product strings
  const displayTitle = lang === "kh" ? item.titleKh : item.title;
  const displayCategory = lang === "kh" ? item.categoryKh : item.category;
  const displayDesc = lang === "kh" ? item.descriptionKh : item.description;

  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 ${
        darkMode
          ? "bg-slate-800 border-slate-700 text-white hover:border-indigo-400"
          : "bg-white border-slate-200 text-slate-900 hover:border-indigo-300 shadow-xs"
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-4xl">{item.icon}</span>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500">
            {displayCategory}
          </span>
        </div>

        <h3 className="font-extrabold text-lg mb-2">{displayTitle}</h3>
        <p
          className={`text-sm mb-6 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
        >
          {displayDesc}
        </p>
      </div>

      <div
        className={`pt-4 border-t flex items-center justify-between ${
          darkMode ? "border-slate-700" : "border-slate-100"
        }`}
      >
        <span className="text-xl font-black">{formatPrice(item.price)}</span>

        <button
          onClick={() => addToCart(item)}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
        >
          {itemInCart ? `${t.addMore} (${itemInCart.qty})` : t.addToCart}
        </button>
      </div>
    </div>
  );
}
