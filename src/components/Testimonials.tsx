import React from 'react';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 relative">
      <div className="absolute -top-4 left-8 text-pink-500 text-6xl">"</div>
      <p className="text-gray-700 italic mb-6 pt-4 relative z-10">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold">
          {name.charAt(0)}
        </div>
        <div className="ml-3">
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

const testimonials: TestimonialProps[] = [
  {
    quote: "Herscape was exactly what I needed to realign my vision and connect with incredible women. The balance between business development and personal wellness was perfect.",
    name: "Sarah Johnson",
    title: "Founder & CEO, TechBright"
  },
  {
    quote: "The connections I made at Herscape have been invaluable. I left with new investors, business partners, and lifelong friends who continue to support my journey.",
    name: "Maya Patel",
    title: "Creative Director, Design House"
  },
  {
    quote: "The luxury experience combined with deep, meaningful work created the perfect environment to reset and reimagine my business. Worth every moment and investment.",
    name: "Elena Rodriguez",
    title: "Founder, Sustainable Fashion Brand"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-pink-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Transformed Perspectives</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Hear from women who've experienced the Herscape journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;