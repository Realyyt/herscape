'use client';
import React from 'react';
import { motion, easeInOut, Variants } from 'framer-motion';
import Link from 'next/link';

const pulseTransition = {
  loop: Infinity,
  ease: easeInOut,
  duration: 2,
  repeatType: 'reverse' as const,
};

const worldVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 60,
      ease: easeInOut,
      repeat: Infinity,
    }
  }
};

const lightningVariants: Variants = {
  hidden: { 
    opacity: 0, 
    pathLength: 0,
    scale: 0.8
  },
  visible: (custom: number) => ({
    opacity: [0, 1, 0],
    pathLength: [0, 1, 1],
    scale: [0.8, 1, 1],
    transition: {
      duration: 0.8,
      times: [0, 0.3, 1],
      delay: custom * 0.5,
      repeat: Infinity,
      repeatDelay: 2,
      ease: easeInOut
    },
  }),
};

const plantGrowthVariants: Variants = {
  grow: (custom: number) => ({
    pathLength: [0, 1, 1, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 4,
      times: [0, 0.4, 0.8, 1],
      delay: custom * 0.5,
      repeat: Infinity,
      ease: easeInOut
    }
  })
};

const leafGrowthVariants: Variants = {
  grow: (custom: number) => ({
    scale: [0, 1, 1, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 4,
      times: [0, 0.4, 0.8, 1],
      delay: custom * 0.5,
      repeat: Infinity,
      ease: easeInOut
    }
  })
};

export default function About() {
  return (
    <div className="w-full bg-white">
      {/* Full viewport height hero section */}
      <section className="min-h-screen w-full bg-[#f7ffe5] flex items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 text-black tracking-tight leading-tight">
              ABOUT<br />
              HERSCAPE
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-2xl">
              A Movement for Women Who Dare to Dream
              <span className="block mt-2 text-[#bdda57] font-bold">Authenticity. Growth. Connection.</span>
            </p>
            <Link href="/join" className="inline-block px-6 sm:px-8 py-3 bg-black text-white rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors">
              JOIN THE MOVEMENT
            </Link>
          </div>
        </div>
      </section>

      {/* First Section: Card + World SVG */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
          {/* Vision Card */}
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border-2 border-black order-2 lg:order-1">
            <div className="p-6 sm:p-8 md:p-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tight leading-tight">
                OUR<br />
                VISION
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Herscape was born from a simple yet powerful vision: to create a space where ambitious women can thrive, connect, and build their legacy. In a world that often tries to dim our light, we're here to amplify it.
              </p>
            </div>
          </div>

          {/* Lamp SVG */}
          <div className="flex justify-center order-1 lg:order-2">
            <motion.div
              className="w-[200px] sm:w-[250px] md:w-[300px]"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={pulseTransition}
            >
              <svg width="100%" height="100%" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                {/* Lamp base (dark but visible) */}
                <ellipse cx="150" cy="370" rx="45" ry="15" fill="#1a1a1a" stroke="#333333" strokeWidth="1"/>
                {/* Lamp stand/neck (dark but visible) */}
                <rect x="145" y="320" width="10" height="50" fill="#2d2d2d" stroke="#333333" strokeWidth="1"/>
                {/* Lamp body/stem (dark but visible) */}
                <ellipse cx="150" cy="340" rx="25" ry="20" fill="#333333" stroke="#444444" strokeWidth="1"/>
                {/* Lamp neck extension (dark but visible) */}
                <rect x="147" y="280" width="6" height="40" fill="#2d2d2d" stroke="#333333" strokeWidth="1"/>
                {/* Transparent lamp shade (dark but visible outline) */}
                <path d="M 80 180 Q 80 160, 100 150 L 200 150 Q 220 160, 220 180 L 210 280 Q 200 290, 190 290 L 110 290 Q 100 290, 90 280 Z" 
                      fill="rgba(255,255,255,0.02)" stroke="#444444" strokeWidth="1"/>
                {/* Lamp shade rim (top) - dark but visible */}
                <ellipse cx="150" cy="150" rx="70" ry="8" fill="#333333" stroke="#444444" strokeWidth="1"/>
                {/* Lamp shade rim (bottom) - dark but visible */}
                <ellipse cx="150" cy="285" rx="50" ry="6" fill="#333333" stroke="#444444" strokeWidth="1"/>
                {/* Light bulb socket area (dark but visible) */}
                <rect x="145" y="270" width="10" height="15" fill="#222222"/>
                {/* Decorative elements on base (dark but visible) */}
                <circle cx="150" cy="340" r="3" fill="#222222"/>
                {/* Light bulb filament (dark but visible) */}
                <ellipse cx="150" cy="265" rx="8" ry="12" fill="none" stroke="#444444" strokeWidth="1"/>
                <path d="M 145 258 Q 150 262, 155 258" stroke="#444444" strokeWidth="1" fill="none"/>
                <path d="M 145 272 Q 150 268, 155 272" stroke="#444444" strokeWidth="1" fill="none"/>
                {/* THE LIGHT BEGINS - Slower animations */}
                {/* Spark of hope */}
                <circle cx="150" cy="265" r="1" fill="#FF4500">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite"/>
                  <animate attributeName="r" values="1;3;1" dur="2s" begin="0s" repeatCount="indefinite"/>
                </circle>
                {/* Bulb filament ignites */}
                <ellipse cx="150" cy="265" rx="8" ry="12" fill="#FF4500">
                  <animate attributeName="opacity" values="0;0.9;0" dur="2s" begin="0.4s" repeatCount="indefinite"/>
                </ellipse>
                {/* Light spreads from the source */}
                {/* Layer 1: Immediate bulb area */}
                <ellipse cx="150" cy="265" rx="15" ry="18" fill="#FF4500">
                  <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.8s" repeatCount="indefinite"/>
                </ellipse>
                {/* Layer 2: Lower shade illumination */}
                <ellipse cx="150" cy="250" rx="25" ry="25" fill="#FF6600">
                  <animate attributeName="opacity" values="0;0.7;0" dur="2s" begin="1.2s" repeatCount="indefinite"/>
                </ellipse>
                {/* Layer 3: Middle shade fills with light */}
                <ellipse cx="150" cy="230" rx="40" ry="35" fill="#FF6600">
                  <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin="1.6s" repeatCount="indefinite"/>
                </ellipse>
                {/* Layer 4: Upper shade glows */}
                <ellipse cx="150" cy="210" rx="50" ry="40" fill="#FF7F00">
                  <animate attributeName="opacity" values="0;0.5;0" dur="2s" begin="2s" repeatCount="indefinite"/>
                </ellipse>
                {/* Layer 5: Full shade illuminated */}
                <ellipse cx="150" cy="185" rx="60" ry="50" fill="#FF7F00">
                  <animate attributeName="opacity" values="0;0.4;0" dur="2s" begin="2.4s" repeatCount="indefinite"/>
                </ellipse>
                {/* Layer 6: Light breaks free */}
                <ellipse cx="150" cy="200" rx="80" ry="70" fill="#FFB347">
                  <animate attributeName="opacity" values="0;0.3;0" dur="2s" begin="2.8s" repeatCount="indefinite"/>
                </ellipse>
                {/* Layer 7: The salvation */}
                <ellipse cx="150" cy="180" rx="120" ry="100" fill="#FFC649">
                  <animate attributeName="opacity" values="0;0.15;0" dur="2s" begin="3.2s" repeatCount="indefinite"/>
                </ellipse>
                {/* Final glow on the transparent shade */}
                <path d="M 80 180 Q 80 160, 100 150 L 200 150 Q 220 160, 220 180 L 210 280 Q 200 290, 190 290 L 110 290 Q 100 290, 90 280 Z" 
                      fill="rgba(255,140,0,0.15)">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin="3.6s" repeatCount="indefinite"/>
                </path>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Section: Growing Plants SVG + Card */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
          {/* Growing Plants SVG */}
          <div className="flex justify-center order-2 lg:order-1">
            <motion.svg 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]"
            >
              {/* Soil with gentle wave motion */}
              <motion.path 
                d="M50 350 C150 330 250 370 350 350 L350 400 L50 400 Z" 
                fill="#4b5563"
                animate={{
                  d: [
                    "M50 350 C150 330 250 370 350 350 L350 400 L50 400 Z",
                    "M50 350 C150 360 250 340 350 350 L350 400 L50 400 Z",
                    "M50 350 C150 330 250 370 350 350 L350 400 L50 400 Z"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: easeInOut
                }}
              />
              {/* Plant 1 */}
              <motion.path
                d="M100 350 C100 300 120 280 140 260 C160 240 140 220 120 200"
                stroke="#22c55e"
                strokeWidth="4"
                variants={plantGrowthVariants}
                initial={{ pathLength: 0, opacity: 0 }}
                animate="grow"
                custom={0}
              />
              <motion.path
                d="M140 260 C160 240 180 260 200 240"
                stroke="#22c55e"
                strokeWidth="4"
                variants={plantGrowthVariants}
                initial={{ pathLength: 0, opacity: 0 }}
                animate="grow"
                custom={1}
              />
              {/* Plant 2 */}
              <motion.path
                d="M200 350 C200 300 180 280 160 260 C140 240 160 220 180 200"
                stroke="#16a34a"
                strokeWidth="4"
                variants={plantGrowthVariants}
                initial={{ pathLength: 0, opacity: 0 }}
                animate="grow"
                custom={2}
              />
              <motion.path
                d="M160 260 C140 240 120 260 100 240"
                stroke="#16a34a"
                strokeWidth="4"
                variants={plantGrowthVariants}
                initial={{ pathLength: 0, opacity: 0 }}
                animate="grow"
                custom={3}
              />
              {/* Plant 3 */}
              <motion.path
                d="M300 350 C300 300 320 280 340 260 C360 240 340 220 320 200"
                stroke="#15803d"
                strokeWidth="4"
                variants={plantGrowthVariants}
                initial={{ pathLength: 0, opacity: 0 }}
                animate="grow"
                custom={4}
              />
              <motion.path
                d="M340 260 C360 240 380 260 400 240"
                stroke="#15803d"
                strokeWidth="4"
                variants={plantGrowthVariants}
                initial={{ pathLength: 0, opacity: 0 }}
                animate="grow"
                custom={5}
              />
              {/* Leaves */}
              <motion.circle
                cx="120"
                cy="200"
                r="8"
                fill="#4ade80"
                variants={leafGrowthVariants}
                initial={{ scale: 0, opacity: 0 }}
                animate="grow"
                custom={6}
              />
              <motion.circle
                cx="180"
                cy="200"
                r="8"
                fill="#4ade80"
                variants={leafGrowthVariants}
                initial={{ scale: 0, opacity: 0 }}
                animate="grow"
                custom={7}
              />
              <motion.circle
                cx="320"
                cy="200"
                r="8"
                fill="#4ade80"
                variants={leafGrowthVariants}
                initial={{ scale: 0, opacity: 0 }}
                animate="grow"
                custom={8}
              />
            </motion.svg>
          </div>

          {/* Mission Card */}
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border-2 border-black bg-[#f7ffe5] order-1 lg:order-2">
            <div className="p-6 sm:p-8 md:p-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 tracking-tight leading-tight">
                OUR<br />
                MISSION
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                Our mission is to empower women to break through barriers, shatter glass ceilings, and create their own definitions of success. We believe that when women support women, incredible things happen.
              </p>
              <ul className="text-base sm:text-lg md:text-xl text-gray-700 space-y-3 sm:space-y-4">
                <li>• Authenticity in all we do</li>
                <li>• Unwavering support for growth</li>
                <li>• Creating meaningful connections</li>
                <li>• Celebrating each other's successes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
