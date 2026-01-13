import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code2, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black dark:from-gray-950 dark:to-black text-white py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-accent-cyan" />
              <span className="font-bold text-lg">BOUISSA MOHAMED</span>
            </div>
            <p className="text-gray-400 text-sm">
              Senior Unity Game Developer crafting immersive experiences
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#about" className="hover:text-accent-cyan transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-accent-cyan transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-accent-cyan transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent-cyan transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-cyan transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/bouissa-mohamed-8aa172390/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent-cyan transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} BOUISSA MOHAMED. {t('footer.rights')}.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              {t('footer.madeWith')} <span className="text-accent-cyan">♪</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
