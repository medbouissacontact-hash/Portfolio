import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Moon, Sun, Volume2, VolumeX, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../hooks/useAudio';
import { motion } from 'framer-motion';

export function Header() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { isMuted, toggleMute, playSound } = useAudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    playSound('click');
  };

  const handleNavClick = (sectionId: string) => {
    playSound('click');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.skills'), id: 'skills' },
    { label: t('nav.projects'), id: 'projects' },
    { label: t('nav.experience'), id: 'experience' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-accent-cyan/20 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Code2 className="w-6 h-6 text-accent-cyan" />
          <span className="font-bold text-lg text-gray-800 dark:text-white">BM</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent-cyan dark:hover:text-accent-cyan transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => {
              toggleMute();
              playSound('click');
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-accent-cyan" />
            )}
          </motion.button>

          <motion.button
            onClick={() => {
              toggleTheme();
              playSound('click');
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-accent-lime" />
            ) : (
              <Moon className="w-5 h-5 text-accent-cyan" />
            )}
          </motion.button>

          <motion.button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              playSound('click');
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-gray-900 dark:text-white" />
            )}
          </motion.button>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white dark:bg-gray-900 border-b border-accent-cyan/20"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-accent-cyan hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
