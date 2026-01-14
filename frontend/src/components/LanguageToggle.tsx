import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center gap-1 rounded-xl bg-gray-800 border hover:shadow-md transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-2">
        <motion.div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${
            language === 'en' 
              ? 'bg-purple-500 text-white scale-100' 
              : 'opacity-60 scale-95'
          }`}
        >
          <svg className="w-5 h-3" viewBox="0 0 640 480">
            <path fill="#012169" d="M0 0h640v480H0z"/>
            <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
            <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l246-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
            <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
            <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
          </svg>
          <span className={`text-sm font-medium ${
            language === 'en' ? 'text-white' : 'text-gray-700 dark:text-gray-300'
          }`}>EN</span>
        </motion.div>
        
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
        
        <motion.div
          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all duration-200 ${
            language === 'ja' 
              ? 'bg-purple-500 text-white scale-100' 
              : 'opacity-60 scale-95'
          }`}
        >
          <svg className="w-5 h-3" viewBox="0 0 900 600">
            <rect width="900" height="600" fill="#fff"/>
            <circle cx="450" cy="300" r="180" fill="#bc002d"/>
          </svg>
          <span className={`text-sm font-medium ${
            language === 'ja' ? 'text-white' : 'text-gray-700 dark:text-gray-300'
          }`}>JP</span>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute inset-0 rounded-xl bg-gray-700/50 opacity-0 transition-opacity duration-300"
      />
    </motion.button>
  );
};