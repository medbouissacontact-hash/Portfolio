import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();
  const { playSound } = useAudio();

  const handleCTA = () => {
    playSound('click');
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 pt-16"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-lime/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-lime to-accent-pink rounded-full blur-2xl opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              ></motion.div>
              <motion.img
                src="https://i.ibb.co/Fb6MCxtC/91e3fcbe-6255-454c-a984-bbf0505652e4.jpg"
                alt="BOUISSA MOHAMED"
                className="relative w-full h-full rounded-full border-4 border-accent-cyan/30 object-cover"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="text-gray-900 dark:text-white">{t('hero.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-300">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              onClick={handleCTA}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-lime text-black font-bold rounded-lg shadow-lg shadow-accent-cyan/50 hover:shadow-xl hover:shadow-accent-cyan/70 transition-all duration-300"
            >
              {t('hero.cta')} ▶
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-8 text-sm text-gray-500 dark:text-gray-400"
          >
            {t('hero.scroll')}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-accent-cyan" />
      </motion.div>
    </section>
  );
}
