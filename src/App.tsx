import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MiniGame } from './components/MiniGame';
import { useAudio } from './hooks/useAudio';
import { Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Background = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-accent-cyan/20 opacity-20 blur-[100px]"></div>
    <div className="absolute right-0 top-0 -z-10 h-full w-full bg-transparent">
       <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-accent-purple/20 opacity-50 blur-[80px]"></div>
    </div>
  </div>
);

function App() {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { playSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGameOpen = () => {
    playSound('click');
    setIsGameOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 relative">
      <Background />
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>

      <MiniGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-accent-cyan to-accent-lime text-black rounded-full shadow-lg shadow-accent-cyan/50 hover:shadow-xl hover:shadow-accent-cyan/70 transition-all duration-300 flex items-center justify-center font-bold text-lg"
          title="Back to top"
        >
          ↑
        </button>
      )}

      <motion.button
        onClick={handleGameOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: ["0 0 0 0 rgba(255, 0, 255, 0.4)", "0 0 0 20px rgba(255, 0, 255, 0)"],
        }}
        transition={{
          boxShadow: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }
        }}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-full shadow-lg hover:shadow-accent-pink/50 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
        title="Play mini-game"
      >
        <Gamepad2 className="w-8 h-8 animate-bounce" />
        <span className="font-bold text-lg hidden md:inline">PLAY GAME</span>
      </motion.button>
    </div>
  );
}

export default App;
