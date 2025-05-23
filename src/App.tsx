import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Schedule from './components/Schedule';
import Testimonials from './components/Testimonials';
import InterestForm from './components/InterestForm';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Update the document title
    document.title = "Herscape | A Transformative Experience for Ambitious Women";
    
    // Add custom styles for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      .animation-delay-300 {
        animation-delay: 0.3s;
      }
      
      .animation-delay-600 {
        animation-delay: 0.6s;
      }
      
      .animation-delay-900 {
        animation-delay: 0.9s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Features />
      <Schedule />
      <Testimonials />
      <InterestForm />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;