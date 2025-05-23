import React from 'react';

const Schedule: React.FC = () => {
  const days = [
    {
      day: 'Day 1',
      title: 'Arrival & Welcome',
      activities: [
        'Luxury airport transfers',
        'Check-in to premium accommodations',
        'Welcome reception and networking dinner',
        'Intention setting ceremony'
      ]
    },
    {
      day: 'Day 2',
      title: 'Vision & Clarity',
      activities: [
        'Morning wellness session',
        'Vision workshops with business coaches',
        'Afternoon city tour',
        'Dinner with keynote speaker'
      ]
    },
    {
      day: 'Day 3',
      title: 'Strategy & Growth',
      activities: [
        'Business strategy masterclass',
        'One-on-one coaching sessions',
        'Spa and wellness treatments',
        'Networking dinner with investors'
      ]
    },
    {
      day: 'Days 4-6',
      title: 'Immersion & Connection',
      activities: [
        'Specialized workshops and sessions',
        'Investor and media meetings',
        'Cultural experiences and excursions',
        'Evening networking events'
      ]
    },
    {
      day: 'Day 7',
      title: 'Celebration & Beyond',
      activities: [
        'Final strategy session',
        'Afternoon relaxation',
        'Closing gala with awards',
        'Departure preparations'
      ]
    }
  ];
  
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your 7-Day Journey</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            A perfect blend of business development, wellness, and luxury experiences.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pink-200"></div>
          
          {days.map((day, index) => (
            <div 
              key={index}
              className={`relative flex items-stretch mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 z-10"></div>
              
              {/* Content */}
              <div className="w-1/2 flex">
                <div 
                  className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                    index % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'
                  }`}
                >
                  <div className="mb-4">
                    <span className="text-pink-500 font-semibold">{day.day}</span>
                    <h3 className="text-xl font-bold text-gray-800">{day.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-300 mt-2 mr-2"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Empty space for the other side */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;