import React from 'react';
import { Briefcase, Heart, Users, Sparkles, Calendar, Award, Globe, TrendingUp } from 'lucide-react';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const features: FeatureProps[] = [
  {
    title: 'Business Growth',
    description: 'Strategic workshops, investor meetings, and business development sessions tailored for women entrepreneurs.',
    icon: <Briefcase size={24} />
  },
  {
    title: 'Wellness Focus',
    description: 'Daily wellness activities including yoga, meditation, spa treatments, and nutritional guidance.',
    icon: <Heart size={24} />
  },
  {
    title: 'Global Network',
    description: 'Connect with ambitious women from around the world, creating lifelong relationships and collaborations.',
    icon: <Users size={24} />
  },
  {
    title: 'Luxury Experience',
    description: 'Premium accommodations, curated dining experiences, and exclusive access to Dubai\'s finest venues.',
    icon: <Sparkles size={24} />
  },
  {
    title: '7-Day Immersion',
    description: 'A full week to disconnect from daily pressures and immerse yourself in transformation.',
    icon: <Calendar size={24} />
  },
  {
    title: 'Recognition & Awards',
    description: 'Celebrate achievements at our closing gala with awards recognizing extraordinary women.',
    icon: <Award size={24} />
  },
  {
    title: 'Cultural Exploration',
    description: 'Curated city tours and cultural experiences showcasing the best of Dubai.',
    icon: <Globe size={24} />
  },
  {
    title: 'Personal Growth',
    description: 'Transformative coaching sessions and workshops focused on elevating your mindset and vision.',
    icon: <TrendingUp size={24} />
  }
];

const Features: React.FC = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Herscape Experience</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            A carefully crafted journey blending business growth, personal wellness, and luxury experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;