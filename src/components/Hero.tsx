import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-pink-600 to-pink-400 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col items-center justify-center space-y-12 max-w-3xl mx-auto">
          <h1 className="font-calligraphy text-7xl md:text-8xl lg:text-9xl text-white tracking-wide animate-fade-in-up text-shadow">
            Herscape
          </h1>
          
          <div className="flex items-center justify-center space-x-8 text-white">
            <span className="text-2xl md:text-3xl font-light tracking-wider animate-fade-in-up">Escape</span>
            <span className="text-4xl text-white/50">·</span>
            <span className="text-2xl md:text-3xl font-light tracking-wider animate-fade-in-up">Rebuild</span>
            <span className="text-4xl text-white/50">·</span>
            <span className="text-2xl md:text-3xl font-light tracking-wider animate-fade-in-up">Beyond</span>
          </div>
          
          <p className="text-lg md:text-xl text-white opacity-90 leading-relaxed mt-4 animate-fade-in-up animation-delay-600">
            A transformative 7-day experience in Dubai, exclusively for ambitious women ready to build something extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up animation-delay-900">
            <a 
              href="#interest" 
              className="px-8 py-3 bg-white text-pink-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </a>
            <a 
              href="#about" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      <button 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        onClick={scrollToAbout}
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;