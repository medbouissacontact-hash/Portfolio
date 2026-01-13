import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  youtubeUrl?: string;
}

const getYouTubeThumbnail = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
    : null;
};

export function Projects() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-lime rounded-full mx-auto"></div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-accent-cyan/50 transition-all bg-gray-100 dark:bg-gray-800 ${project.demoUrl ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={(e) => !project.demoUrl && e.preventDefault()}
              >
                <div className="aspect-video overflow-hidden bg-gray-300 dark:bg-gray-700">
                  {(project.imageUrl || (project.youtubeUrl && getYouTubeThumbnail(project.youtubeUrl))) && (
                    <img 
                      src={project.imageUrl || (project.youtubeUrl ? getYouTubeThumbnail(project.youtubeUrl) || '' : '')} 
                      alt={project.title} 
                      className="w-full h-full object-cover" 
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded bg-accent-cyan/20 text-accent-cyan">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
