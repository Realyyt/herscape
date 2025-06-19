import React from 'react';

export default function Join() {
  return (
    <div className="min-h-screen w-full bg-[#f7ffe5] flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 text-left">Join the Herscape Founding Circle</h1>
        <div className="text-xl md:text-2xl text-gray-700 mb-10 font-light text-left">
          <span className="text-[#bdda57] font-bold">Legacy Access:</span> Be one of the first 20 women to shape Herscape's future.
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Founding Member Perks</h2>
          <ul className="text-lg text-gray-700 mb-4 list-disc pl-6">
            <li>Lifetime perks & discounts for all future Herscape programs</li>
            <li>Your name etched in history as one of our founding women</li>
            <li>Exclusive merch (custom journal, identity package & Herscape token)</li>
            <li>Priority access to investor/pitch circles before others</li>
            <li>Board or Gold Club eligibility (for high-tier supporters)</li>
            <li>The pride of being one of 20 women who helped birth Herscape</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 bg-[#eaffd0] rounded-2xl p-6 shadow flex flex-col items-center">
            <div className="text-lg font-bold mb-2 text-gray-900">Supporter</div>
            <div className="text-2xl font-extrabold text-[#bdda57] mb-2">$50</div>
            <div className="text-gray-700 text-base text-center mb-2">All core perks, your name in history, and exclusive merch.</div>
          </div>
          <div className="flex-1 bg-[#eaffd0] rounded-2xl p-6 shadow flex flex-col items-center">
            <div className="text-lg font-bold mb-2 text-gray-900">Pioneer</div>
            <div className="text-2xl font-extrabold text-[#bdda57] mb-2">$250</div>
            <div className="text-gray-700 text-base text-center mb-2">All Supporter perks, plus priority access to pitch circles and events.</div>
          </div>
          <div className="flex-1 bg-[#eaffd0] rounded-2xl p-6 shadow flex flex-col items-center">
            <div className="text-lg font-bold mb-2 text-gray-900">Angel</div>
            <div className="text-2xl font-extrabold text-[#bdda57] mb-2">$500</div>
            <div className="text-gray-700 text-base text-center mb-2">All Pioneer perks, plus Gold Club/Board eligibility and VIP status.</div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Join?</h2>
          <p className="text-lg text-gray-700 mb-4">
            10% of Herscape's profits will fund women-led businesses in underserved regions around the world. Your contribution isn't just for you — it's for women you may never meet, but whose lives you'll change.
          </p>
          <p className="text-base text-gray-600 mb-2">
            We are only selecting 20 women to begin this movement with. No forms. No hurdles. Just heart.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <a href="#" className="inline-block bg-[#bdda57] text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#eaffd0] transition-all duration-300 shadow">Join the Founding Circle Now</a>
          <div className="mt-6 text-sm text-gray-500 text-center max-w-xl">
            Want to do more than join? You can also give to the Herscape Women's Fund — to directly support our mission of empowering women in underserved regions globally.
          </div>
        </div>
      </div>
    </div>
  );
} 