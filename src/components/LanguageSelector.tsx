'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    // Here you would typically handle the language change logic
    console.log('Language changed to:', language.code);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    }),
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Language Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-transparent border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Select language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
          {currentLanguage.code.toUpperCase()}
        </span>
        <motion.svg
          className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="py-2">
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-primary/5 transition-colors ${
                    currentLanguage.code === language.code
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{language.name}</div>
                    <div className="text-xs text-gray-500 uppercase">{language.code}</div>
                  </div>
                  {currentLanguage.code === language.code && (
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;