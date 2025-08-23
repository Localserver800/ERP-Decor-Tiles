import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // default language

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'fr' : 'en'));
  };

  const value = {
    language,
    toggleLanguage,
    translations: {
      en: {
        welcome: "Welcome to West Africa Decor Tiles",
        searchPlaceholder: "Search products...",
        searchButton: "Search",
        categories: "Categories: Ceramic, Marble, Mosaic",
        cartIcon: "Cart Icon",
      },
      fr: {
        welcome: "Bienvenue chez West Africa Decor Tiles",
        searchPlaceholder: "Rechercher des produits...",
        searchButton: "Rechercher",
        categories: "Catégories : Céramique, Marbre, Mosaïque",
        cartIcon: "Icône du panier",
      }
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};