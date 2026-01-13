import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function About() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [yearsCount, setYearsCount] = useState(0);

  useEffect(() => {
    if (inView && yearsCount < 8) {
      const timer = setTimeout(() => setYearsCount(yearsCount + 1), 100);
      return () => clearTimeout(timer);
    }
  }, [inView, yearsCount]);

  const skills = [
    t('about.skill1'),
    t('about.skill2'),
    t('about.skill3'),
    t('about.skill4'),
    t('about.skill5'),
    t('about.skill6'),
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-2 gradient-text">
                {t('about.title')}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-lime rounded-full"></div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-accent-cyan/20 to-accent-lime/20 border border-accent-cyan/30 rounded-lg p-6 shadow-[0_0_15px_rgba(0,243,255,0.3)] animate-glow"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-8 h-8 text-accent-cyan animate-pulse-fast" />
                <span className="text-3xl font-bold gradient-text">
                  {yearsCount}+ {t('about.experience')}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                &lt;Leveling Up Since 2017 /&gt;
              </p>
            </motion.div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t('about.description')}
            </p>

            <div>
              <p className="text-sm font-bold text-accent-cyan mb-3 uppercase tracking-wide">
                {t('about.focused')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-accent-lime rounded-full"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            className="relative flex justify-center items-center"
          >
             <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative z-10 w-full h-full bg-gray-900/50 backdrop-blur-sm border border-accent-cyan/30 rounded-2xl flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 opacity-20">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="bg-accent-cyan/30"></div>
                      ))}
                   </div>
                   <Code2 className="w-24 h-24 text-accent-cyan relative z-10" />
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

