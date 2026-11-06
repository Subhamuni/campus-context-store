// src/components/Navbar.jsx
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  // Connect directly to both Contexts—NO PROPS NEEDED!
  const { darkMode, toggleTheme } = useTheme();
  const { totalItems, setIsCartOpen } = useCart();
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-colors duration-200 ${
        darkMode
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🎓</span>
          <span className="font-extrabold text-lg tracking-tight">
            Campus<span className="text-indigo-500">Store</span>
          </span>
          <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
            {t.brandSubtitle}
          </span>
        </div>

        {/* Actions: Language Switcher + Theme Toggle + Cart Button */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className={`px-3 py-2 rounded-xl text-sm font-bold border transition cursor-pointer ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700"
                : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            {lang === "en" ? "ភាសាខ្មែរ" : "English"}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`px-3.5 py-2 rounded-xl text-sm font-bold border transition cursor-pointer ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {darkMode ? t.lightMode : t.darkMode}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-xs transition cursor-pointer"
          >
            <span>{t.cartBtn}</span>
            <span className="bg-white text-indigo-700 px-2 py-0.5 rounded-full text-xs font-extrabold">
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
