// Following our 3-Step Context Formula, we will store:

// lang: The active language code ("en" or "kh").

// toggleLanguage: A function to switch between "en" and "kh".

// t: A dictionary object containing all UI labels for the active language so components can simply write {t.addToCart}!

// src/context/LanguageContext.jsx
import { createContext, useState, useContext } from "react";

// Dictionary of UI translations for English (en) and Khmer (kh)
const translations = {
  en: {
    brandSubtitle: "Context API Demo",
    heroTitle: "Academic Courses & Study Materials",
    heroDesc:
      "Powered by ThemeContext, CartContext, and LanguageContext — zero prop drilling!",
    lightMode: "☀️ Light",
    darkMode: "🌙 Dark",
    cartBtn: "🛒 Cart",
    addToCart: "+ Add to Cart",
    addMore: "+ Add More",
    yourCart: "🛒 Your Cart",
    emptyCart: "Your cart is currently empty.",
    remove: "Remove",
    total: "Total",
    clearAll: "Clear All",
    checkout: "Checkout →",
    orderSuccess: "✅ Order Complete! Total:",
  },
  kh: {
    brandSubtitle: "ការបង្ហាញអំពី Context API",
    heroTitle: "វគ្គសិក្សា និងឯកសារសិក្សា",
    heroDesc:
      "ដំណើរការដោយ ThemeContext, CartContext និង LanguageContext ដោយមិនចាំបាច់បញ្ជូន Props!",
    lightMode: "☀️ ភ្លឺ",
    darkMode: "🌙 ងងឹត",
    cartBtn: "🛒 កន្ត្រក",
    addToCart: "+ ដាក់ចូលកន្ត្រក",
    addMore: "+ បន្ថែមទៀត",
    yourCart: "🛒 កន្ត្រកទំនិញរបស់អ្នក",
    emptyCart: "មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ។",
    remove: "លុបចេញ",
    total: "សរុប",
    clearAll: "សម្អាតទាំងអស់",
    checkout: "គិតប្រាក់ →",
    orderSuccess: "✅ ការបញ្ជាទិញជោគជ័យ! សរុប៖",
  },
};

// STEP 1: Create Context
const LanguageContext = createContext();

// STEP 2: Create Provider
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "kh" : "en"));
  };

  // Expose `t` as the active translation dictionary
  const t = translations[lang];

  const formatPrice = (usdAmount) => {
    if (lang === "en") return `$${usdAmount.toFixed(2)}`;
    if (lang === "kh") return `${(usdAmount * 4000).toLocaleString()} ៛`;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

// STEP 3: Create Custom Hook
export function useLanguage() {
  return useContext(LanguageContext);
}
