import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timelineData = [
  { year: '2017', title: 'President&Founder', company: 'Indie Games Association', level: 1 },
  { year: '2017', title: 'Co Founder & Lead Developer', company: 'Awayzen Studio', level: 2 },
  { year: '2018', title: 'Game Developer', company: 'SBP TECH Tunisia', level: 3 },
  { year: '2019', title: 'Mobile Game Developer', company: 'Idealump Tunisia', level: 4 },
  { year: '2024', title: 'Game Developer', company: 'BXB Studio', level: 5 },
  { year: '2024-Now', title: 'Senior Unity Game Developer', company: 'Freelancer', level: 6 },
];

export function Experience() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            {t('experience.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-lime rounded-full mx-auto"></div>
        </motion.div>

        <div className="space-y-6">
          {timelineData.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-accent-cyan/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-2xl font-black mb-2 text-gray-900 dark:text-white">{event.year}</div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm font-medium text-accent-cyan mb-2">{event.company}</p>
                </div>
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-cyan to-accent-lime text-black flex items-center justify-center font-bold text-lg flex-shrink-0"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                >
                  {event.level}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
