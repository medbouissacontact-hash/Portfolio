import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FloatingObject {
  id: number;
  x: number;
  y: number;
}

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniGame({ isOpen, onClose }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [objects, setObjects] = useState<FloatingObject[]>([]);
  const idRef = useRef(0);
  const gameRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isOpen || !gameActive) return;

    gameRef.current = setInterval(() => {
      const newObject: FloatingObject = {
        id: idRef.current++,
        x: Math.random() * 80 + 10,
        y: -10,
      };
      setObjects((prev) => [...prev, newObject]);

      setTimeout(() => {
        setObjects((prev) => prev.filter((obj) => obj.id !== newObject.id));
      }, 4000);
    }, 400);

    return () => clearInterval(gameRef.current);
  }, [isOpen, gameActive]);

  const handleClick = (id: number) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== id));
    setScore((prev) => prev + 10);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-gray-900 to-black rounded-lg w-full max-w-2xl relative border border-accent-cyan/30"
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-accent-cyan" />
          </button>
        </div>

        <div className="p-6 text-center">
          <h2 className="font-bold text-lg text-white">
            Unity Catcher
          </h2>
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Score</p>
              <p className="text-3xl font-bold text-accent-cyan">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-lg font-bold text-accent-lime">Playing</p>
            </div>
          </div>
        </div>

        <div className="relative w-full h-96 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden border-t border-accent-cyan/20">
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <div className="w-16 h-12 bg-gradient-to-t from-accent-cyan to-accent-lime rounded-t-full border-2 border-accent-cyan/50 opacity-60 hover:opacity-100 transition-opacity"></div>
          </div>

          {objects.map((obj) => (
            <motion.button
              key={obj.id}
              onClick={() => handleClick(obj.id)}
              initial={{ y: '-10%', opacity: 1 }}
              animate={{ y: '110%', opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4, ease: 'linear' }}
              style={{ left: `${obj.x}%` }}
              className="absolute w-8 h-8 bg-gradient-to-r from-accent-cyan to-accent-lime rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-accent-cyan/50"
            >
              <div className="w-full h-full rounded-full animate-pulse"></div>
            </motion.button>
          ))}
        </div>

        <div className="p-6 bg-gray-900 text-center border-t border-accent-cyan/20">
          <button
            onClick={() => {
              setScore(0);
              setObjects([]);
              setGameActive(!gameActive);
            }}
            className="px-6 py-2 bg-accent-cyan text-black font-bold rounded-lg hover:bg-accent-lime transition-colors"
          >
            {gameActive ? 'Pause' : 'Resume'}
          </button>
          <p className="text-xs text-gray-400 mt-3">
            Click the falling objects to score points!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
