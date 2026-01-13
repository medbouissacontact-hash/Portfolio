import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillsData = [
  { name: 'Unity', level: 100 },
  { name: 'C#', level: 100 },
  { name: 'C++', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Photon', level: 90 },
  { name: 'Firebase', level: 95 },
  { name: 'PlayFab', level: 90 },
  { name: 'WebGL', level: 85 },
  { name: 'AR/VR', level: 90 },
  { name: 'Analytics', level: 95 },
  { name: 'Git', level: 100 },
];

export function Skills() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            {t('skills.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-lime rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                <span className="text-xs px-2 py-1 rounded bg-accent-cyan/20 text-black dark:text-accent-cyan">
                  {skill.level}%
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-cyan to-accent-lime rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
