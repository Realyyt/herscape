'use client';
import React from 'react';



const WavePattern = () => (
  <svg className="w-full h-64" viewBox="0 0 400 200" preserveAspectRatio="none">
    <path
      d="M0,100 C150,200 250,0 400,100 L400,200 L0,200 Z"
      fill="#eaffd0"
    />
  </svg>
);

export default function Community() {
  return (
    <div className="w-full bg-white">
      {/* Full viewport height hero section */}
      <section className="min-h-screen w-full bg-[#f7ffe5] flex items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 text-black tracking-tight leading-tight">
              A NEW WORLD<br />
              FOR AMBITIOUS<br />
              WOMEN
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-2xl">
              Herscape isn&apos;t just a program — it&apos;s a movement.
              <span className="block mt-2 text-[#bdda57] font-bold">Power. Peace. Possibility.</span>
            </p>
            <button className="inline-block px-6 sm:px-8 py-3 bg-black text-white rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors">
              CHAT WITH US
            </button>
          </div>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-black">
            <div className="p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">WELCOME TO<br />HERSCAPE</h2>
              <p className="text-base sm:text-lg text-gray-700">
                A space where driven women escape the noise, find clarity, and build with power. We&apos;re creating an exclusive global circle for women ready to rise — founders, creators, leaders, and dreamers.
              </p>
            </div>
          </div>

          {/* Card 2 with Wave Pattern */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="p-6 sm:p-8 md:p-10 bg-[#eaffd0] h-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">SUPPORT &<br />INSPIRATION</h2>
              <p className="text-base sm:text-lg text-gray-700">
                Find support, inspiration, and a network of ambitious women who believe in power, peace, and possibility. We&apos;re here to help you thrive and grow.
              </p>
            </div>
          </div>

          {/* Card 3 with Wave Pattern */}
          <div className="relative overflow-hidden rounded-3xl">
            <WavePattern />
            <div className="absolute inset-0 p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">FOUNDING<br />CIRCLE</h2>
              <p className="text-base sm:text-lg text-gray-700">
                Join the founding circle and leave your footprint on what will become one of the world&apos;s most impactful women&apos;s initiatives. Your journey starts here.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-black">
            <div className="p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">GLOBAL<br />CONNECTION</h2>
              <p className="text-base sm:text-lg text-gray-700">
                Be part of Herscape — where your ambition is celebrated, your dreams are supported, and your journey is shared. Connect with like-minded women worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
