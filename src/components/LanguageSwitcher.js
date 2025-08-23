import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { toggleLanguage, language } = useLanguage();

  return (
    <button onClick={toggleLanguage}>
      {language === 'en' ? 'Switch to French' : 'Switch to English'}
    </button>
  );
};

export default LanguageSwitcher;