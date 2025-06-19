import React from 'react';

export default function Events() {
  const box = 'rounded-3xl border border-black bg-white p-4 md:p-6';
  const boxPastel = 'rounded-3xl border border-black bg-[#eaffd0] p-4 md:p-6';
  const heading = 'font-black text-2xl md:text-4xl uppercase tracking-tight';

  return (
    <div className="min-h-screen w-full bg-[#eaffd0] flex flex-col py-16 px-4 md:px-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
        {/* Header Section - Full Width */}
        <div className={`${box} col-span-full mb-4`}>
          <h1 className={`${heading} mb-4`}>Herscape Dubai</h1>
          <p className="text-xl text-gray-700">
            Our flagship experience for ambitious women. Founding circle members get premium access when registration opens!
          </p>
        </div>

        {/* Dubai Image Card 1 */}
        <div className={`${box} col-span-2 row-span-2 relative overflow-hidden min-h-[400px]`}>
        <video
            src="/d3.mp4" 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
            <h2 className="font-bold text-xl">Luxury Retreat Experience</h2>
            <p className="text-gray-700">Immerse yourself in Dubai's most exclusive locations</p>
          </div>
        </div>

        {/* Event Details Card */}
        <div className={`${boxPastel} col-span-2 flex flex-col justify-between`}>
          <div>
            <h3 className="font-bold text-lg mb-3">What to Expect</h3>
            <ul className="space-y-2">
              <li className="flex items-center">✨ Strategic business growth & workshops</li>
              <li className="flex items-center">✨ Deep personal wellness experiences</li>
              <li className="flex items-center">✨ Real global networking</li>
              <li className="flex items-center">✨ Media visibility opportunities</li>
            </ul>
          </div>
        </div>

        {/* Schedule Overview */}
        <div className={`${boxPastel} col-span-2`}>
          <h3 className="font-bold text-lg mb-3">Event Schedule</h3>
          <div className="space-y-2">
            <div className="bg-white rounded-xl p-3">
              <div className="font-bold">Day 1-2: Welcome & Connection</div>
              <div className="text-sm text-gray-600">Luxury hotel check-in, welcome dinner, city tour</div>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="font-bold">Day 3-4: Growth & Strategy</div>
              <div className="text-sm text-gray-600">Workshops, networking, wellness activities</div>
            </div>
            <div className="bg-white rounded-xl p-3">
              <div className="font-bold">Day 5: Transformation</div>
              <div className="text-sm text-gray-600">Desert retreat, closing ceremony</div>
            </div>
          </div>
        </div>

        {/* Dubai Image Card 2 */}
        <div className={`${box} col-span-2 row-span-2 relative overflow-hidden min-h-[600px]`}>
          <img
            src='/d.jpg'
            alt="Networking Event"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
            <h2 className="font-bold text-xl">Exclusive Networking</h2>
            <p className="text-gray-700">Connect with global leaders and visionaries</p>
          </div>
        </div>

        {/* Registration Info */}
        <div className={`${box} col-span-2 flex flex-col justify-center min-h-[600px] py-12`}>
          <h3 className="font-bold text-3xl mb-6">Join Us in Dubai</h3>
          <div className="space-y-4">
            <div className="bg-[#eaffd0] rounded-xl p-6">
              <div className="font-bold text-lg mb-1">Early Bird Registration</div>
              <div>Opens Soon - Limited Spots Available</div>
            </div>
            <div className="bg-[#eaffd0] rounded-xl p-6">
              <div className="font-bold text-lg mb-1">Founding Circle Members</div>
              <div>Get Priority Access & Special Perks</div>
            </div>
            <button className="w-full bg-black text-white rounded-full py-4 font-bold mt-4 text-lg">
              Register Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 