import React from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
  return (
    <div className="min-h-screen w-full bg-[#eaffd0] flex flex-col py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tight mb-4">
          Herscape Dubai - Events Page
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8">
          Our flagship experience for ambitious women. Founding circle members get premium access when registration opens!
        </p>
        
        <div className="bg-white rounded-3xl border border-black p-6 mb-6">
          <h2 className="font-bold text-lg sm:text-xl mb-3">What to Expect</h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-center">✨ Strategic business growth & workshops</li>
            <li className="flex items-center">✨ Deep personal wellness experiences</li>
            <li className="flex items-center">✨ Real global networking</li>
            <li className="flex items-center">✨ Media visibility opportunities</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-3xl border border-black p-6 mb-6">
          <h2 className="font-bold text-lg sm:text-xl mb-3">Event Schedule</h2>
          <div className="space-y-2">
            <div className="bg-[#eaffd0] rounded-xl p-3">
              <div className="font-bold text-sm sm:text-base">Day 1-2: Welcome & Connection</div>
              <div className="text-xs sm:text-sm text-gray-600">Luxury hotel check-in, welcome dinner, city tour</div>
            </div>
            <div className="bg-[#eaffd0] rounded-xl p-3">
              <div className="font-bold text-sm sm:text-base">Day 3-4: Growth & Strategy</div>
              <div className="text-xs sm:text-sm text-gray-600">Workshops, networking, wellness activities</div>
            </div>
            <div className="bg-[#eaffd0] rounded-xl p-3">
              <div className="font-bold text-sm sm:text-base">Day 5: Transformation</div>
              <div className="text-xs sm:text-sm text-gray-600">Desert retreat, closing ceremony</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl border border-black p-6">
          <h2 className="font-bold text-2xl sm:text-3xl mb-4">Join Us in Dubai</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-[#eaffd0] rounded-xl p-4 sm:p-6">
              <div className="font-bold text-base sm:text-lg mb-1">Early Bird Registration</div>
              <div className="text-sm sm:text-base">Opens Soon - Limited Spots Available</div>
            </div>
            <div className="bg-[#eaffd0] rounded-xl p-4 sm:p-6">
              <div className="font-bold text-base sm:text-lg mb-1">Founding Circle Members</div>
              <div className="text-sm sm:text-base">Get Priority Access & Special Perks</div>
            </div>
            <Link to="/join" className="w-full bg-black text-white rounded-full py-3 sm:py-4 font-bold mt-3 sm:mt-4 text-base sm:text-lg text-center block">
              Register Interest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 