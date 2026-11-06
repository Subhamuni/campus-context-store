// src/components/CartSidebar.jsx
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function CartSidebar() {
  const { darkMode } = useTheme();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();
  const { lang, t, formatPrice } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div
        className={`w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl ${
          darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-500/20">
          <h2 className="text-xl font-extrabold">{t.yourCart}</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-500/10 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cart.length === 0 ? (
            <p className="text-center py-12 text-slate-400">{t.emptyCart}</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex justify-between items-center ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm">
                    {lang === "Kh" ? item.titleKh : item.title}
                  </h4>
                  <p className="text-xs text-indigo-500 font-bold mt-0.5">
                    {formatPrice(item.price)} × {item.qty} =
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:underline font-bold cursor-pointer ml-3"
                >
                  {t.remove}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-slate-500/20 space-y-3">
            <div className="flex justify-between text-lg font-extrabold">
              <span>{t.total}</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="flex-1 py-2.5 rounded-xl border border-red-500/40 text-red-500 font-bold text-sm hover:bg-red-500/10 cursor-pointer"
              >
                {t.clearAll}
              </button>
              <button
                onClick={() => {
                  alert(`✅ Order Complete! Total: ${formatPrice(totalPrice)}`);
                  clearCart();
                  setIsCartOpen(false);
                }}
                className="flex-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm cursor-pointer"
              >
                {t.checkout}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
