import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingTexts = [
    "Crafting your experience...",
    "Preparing the journey...",
    "Loading HERSCAPE...",
    "Almost ready...",
    "Welcome to HERSCAPE"
  ];

  useEffect(() => {
    // Simulate loading progress with more realistic timing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(onLoadingComplete, 1200);
          return 100;
        }
        // Slower, more realistic progress
        return prev + Math.random() * 8 + 2;
      });
    }, 300);

    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete, loadingTexts.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-[#eaffd0] via-white to-[#f3e5ff] flex items-center justify-center overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-[#eaffd0] to-[#f3e5ff] rounded-full opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-[#f3e5ff] to-[#eaffd0] rounded-full opacity-40"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="text-center max-w-lg mx-auto px-4 sm:px-8 relative z-10">
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 sm:mb-12"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold font-calligraphy text-black tracking-tight mb-3 sm:mb-4"
              style={{fontWeight: 700}}
              animate={{
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 0 20px rgba(0,0,0,0.1)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              HERSCAPE
            </motion.h1>
            <motion.div 
              className="w-20 sm:w-32 h-1 bg-black mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "5rem sm:8rem" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 sm:mb-10"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 font-quantico tracking-wide">
              {loadingTexts[currentText]}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8 sm:mb-10">
            <div className="w-full bg-white border-2 border-black rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#eaffd0] via-[#f3e5ff] to-[#eaffd0]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm font-bold mt-2 sm:mt-3 text-gray-700 tracking-wide"
            >
              {Math.round(progress)}% Complete
            </motion.p>
          </div>

          {/* Animated Loading Dots */}
          <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 1, 0.3],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Completion Animation */}
          {isComplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 sm:mt-8"
            >
              <motion.div 
                className="text-3xl sm:text-4xl mb-2 sm:mb-3"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
              <motion.p 
                className="text-base sm:text-lg font-bold text-gray-800 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Ready to explore HERSCAPE
              </motion.p>
            </motion.div>
          )}

          {/* Subtle floating elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-black rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen; 