import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-400 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Join a community of ambitious women ready to escape, rebuild, and go beyond. The next Herscape experience is waiting for you.
          </p>
          <div className="inline-flex space-x-4">
            <a 
              href="#interest" 
              className="px-8 py-3 bg-white text-pink-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </a>
            <a 
              href="#" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;