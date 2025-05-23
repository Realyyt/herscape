import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className="text-pink-500">Herscape</span> — A Movement for Ambitious Women
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            A curated space where business and personal development intersect with wellness and peace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-medium text-pink-500">Herscape</span> is a transformative experience crafted exclusively for ambitious women — founders, entrepreneurs, creatives, and business leaders — who are ready to escape the noise, reconnect with their vision, and build something extraordinary. It's not just a retreat or a business event — it's a curated week of clarity, connection, and elevation.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Set in the heart of Dubai, Herscape offers an immersive 7-day journey that blends high-level learning, global networking, personal wellness, and intentional luxury. Participants come to rest, reflect, and realign — but more importantly, they come to build, pitch, grow, and connect with like-minded women and potential investors.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                The idea behind Herscape was born out of a deep need — the need for women to have a space where business and personal development intersect with wellness and peace. A space that isn't just about attending lectures or panel sessions, but about experiencing life at a higher level, while being surrounded by powerful, driven women who are just as hungry for growth.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-pink-300/40 mix-blend-overlay"></div>
              <img 
                src="https://images.pexels.com/photos/7709452/pexels-photo-7709452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Women entrepreneurs networking" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-pink-100 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;