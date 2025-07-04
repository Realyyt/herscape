'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const pastelBg = 'bg-[#eaffd0]';
const box = 'rounded-3xl border border-black bg-white p-3 sm:p-4 md:p-6';
const boxPastel = 'rounded-3xl border border-black ' + pastelBg + ' p-3 sm:p-4 md:p-6';
const heading = 'font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tight';

const services = [
  'COMMUNITY',
  'GROWTH',
  'MENTORSHIP',
  'RETREATS',
  'EVENTS',
  'PARTNERSHIPS',
  'CONTENT',
  'SUPPORT',
];

function PerpetualList({ fontClass = "" }) {
  const [height, setHeight] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (listRef.current) {
      setHeight(listRef.current.scrollHeight / 2);
    }
    controls.start({
      y: [0, -height],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 8,
          ease: 'linear',
        },
      },
    });
  }, [height, controls]);

  return (
    <div style={{ overflow: 'hidden', height: '300px sm:400px', position: 'relative' }}>
      <motion.div
        ref={listRef}
        animate={controls}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {[...services, ...services].map((s, i) => (
          <div key={i} className={`mb-0.5 font-black text-lg sm:text-xl md:text-3xl leading-tight ${fontClass}`}>
            {s}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [altColor, setAltColor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAltColor(c => !c), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen w-full ${pastelBg} flex flex-col font-quantico`}
    >
      {/* Top Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-3 sm:gap-4 p-3 sm:p-4 md:p-8" style={{marginBottom: '90px'}}>
        {/* Logo & Socials */}
        <div className={`${box} flex flex-col justify-between col-span-1 row-span-1 relative overflow-hidden min-h-[200px] sm:min-h-[250px]`}>
          {/* Background Video */}
          <video
            src="/women.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Overlay content */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div />
            <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
              <a href="#" className="text-black text-base sm:text-lg">✕</a>
              <a href="#" className="text-black text-base sm:text-lg">in</a>
              <Link href="/join" className="border border-black rounded-full px-2 sm:px-3 py-1 text-xs font-bold ml-2">Join</Link>
              <Link href="/join" className="border border-black rounded-full px-2 sm:px-3 py-1 text-xs font-bold ml-auto">Get In Touch</Link>
            </div>
          </div>
        </div>
        {/* Center Video Section (spans 2 columns, 1 row) */}
        <div className="col-span-1 sm:col-span-2 row-span-1 flex flex-col gap-3 sm:gap-4 justify-center">
          <div className={`${box} flex items-center justify-center bg-gradient-to-br from-[#eaffd0] to-white relative overflow-hidden p-0`} style={{ minHeight: '15rem sm:18rem' }}>
            <video
              src="/logo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-2xl border border-black"
            />
          </div>
        </div>
        {/* Mission/Intro */}
        <div className={`${box} flex flex-col col-span-1 row-span-1`}>
          <div className="mb-2 mt-6 sm:mt-10">
            <div className={heading + ' text-lg sm:text-xl md:text-3xl font-quantico'}>HERSCAPE IS THE GO-TO SPACE FOR AMBITIOUS WOMEN</div>
            <div className="mt-4 sm:mt-6 text-black text-sm sm:text-base md:text-lg font-quantico">
              Since 2024, we&apos;ve helped women founders, creators, and leaders find clarity, build power, and connect globally. If you&apos;re ready to rise, let&apos;s talk.
            </div>
          </div>
        </div>
        {/* WHAT WE DO - 2x height */}
        <div className={`${boxPastel} flex flex-col col-span-1 row-span-2 min-h-[400px] sm:min-h-[500px]`}>
          <div className="text-xs mb-1 tracking-widest uppercase font-quantico">What We Do</div>
          <PerpetualList fontClass="font-quantico" />
        </div>
        {/* Membership Tiers */}
        <div className={`${boxPastel} col-span-1 sm:col-span-2 row-span-1 flex flex-col`}>
          <div className="text-xs mb-1 tracking-widest uppercase">Membership Tiers</div>
          <div className="flex flex-col gap-2">
            {['Pioneer', 'Angel'].map((tier, i) => (
              <div key={tier} className="flex items-center justify-between bg-white rounded-xl border border-black px-3 sm:px-4 py-2">
                <span className="font-black text-sm sm:text-base">{tier}</span>
                <span className="font-bold text-xs sm:text-sm">${[250, 500][i]}</span>
                <Link href="/join" className="border border-black rounded-full px-2 sm:px-3 py-1 text-xs font-bold">Join</Link>
              </div>
            ))}
          </div>
        </div>
        {/* Chat/Events */}
        <div
          className={`rounded-3xl border border-black flex flex-col h-full items-center justify-between relative overflow-hidden col-span-1 row-span-1 p-3 sm:p-4 md:p-6 min-h-[200px] sm:min-h-[250px] ${altColor ? 'bg-purple-300' : pastelBg}`}
        >
          {/* Animated 3D Light Purple Spaghetti Art SVG, perfectly centered and contained */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            style={{ width: '100%', height: '100%' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <svg
              viewBox="0 0 400 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '80%', height: '80%', filter: 'blur(6px)', opacity: 0.65, display: 'block' }}
            >
              <defs>
                <linearGradient id="spaghetti-gradient" x1="0" y1="0" x2="400" y2="220" gradientUnits="userSpaceOnUse">
                  {altColor ? (
                    <>
                      <stop stopColor="#7fff7f" />
                      <stop offset="1" stopColor="#00ff99" />
                    </>
                  ) : (
                    <>
                      <stop stopColor="#f3bfff" />
                      <stop offset="1" stopColor="#e0aaff" />
                    </>
                  )}
                </linearGradient>
              </defs>
              <path
                d="M30 180 Q 100 60 200 110 Q 300 160 370 40"
                stroke="url(#spaghetti-gradient)"
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M60 200 Q 120 100 220 140 Q 320 180 350 60"
                stroke="url(#spaghetti-gradient)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M100 210 Q 180 120 260 170 Q 340 220 340 100"
                stroke="url(#spaghetti-gradient)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
          <Link href="/join" className="w-full border border-black rounded-full py-2 text-sm sm:text-base text-center font-black mb-2 relative z-10">Chat With Us</Link>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-calligraphy mb-1 relative z-10" style={{fontWeight: 700}}>HERSCAPE</div>
          <div className="w-full h-8 sm:h-12 rounded-2xl bg-gradient-to-br from-[#eaffd0] to-white mt-1 relative z-10" />
        </div>
      </div>
      {/* Mobile Menu (Overlay) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl"></h2>
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Link href="/about" className="text-2xl font-bold py-2" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
                <Link href="/community" className="text-2xl font-bold py-2" onClick={() => setIsMenuOpen(false)}>COMMUNITY</Link>
                <Link href="/events" className="text-2xl font-bold py-2" onClick={() => setIsMenuOpen(false)}>EVENTS</Link>
                <Link href="/join" className="text-2xl font-bold py-2" onClick={() => setIsMenuOpen(false)}>JOIN</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
