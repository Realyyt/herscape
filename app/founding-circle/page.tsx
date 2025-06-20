'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const membershipTiers = [
  {
    name: "Supporter",
    price: 50,
    perks: [
      "Lifetime access to Herscape community",
      "Exclusive founding member badge",
      "Early access to all programs",
      "Monthly virtual meetups"
    ]
  },
  {
    name: "Pioneer",
    price: 250,
    perks: [
      "All Supporter benefits",
      "Custom Herscape journal",
      "Priority access to events",
      "Quarterly mastermind sessions",
      "Founding member certificate"
    ]
  },
  {
    name: "Angel",
    price: 500,
    perks: [
      "All Pioneer benefits",
      "VIP access to all events",
      "1:1 mentorship session",
      "Custom identity package",
      "Gold Club membership",
      "Board eligibility"
    ]
  }
];

export default function FoundingCircle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-pink-50 py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Join the Founding Circle
          </h1>
          <p className="text-lg sm:text-xl text-pink-600 font-semibold">
            Be One of the First 20 Women to Shape Herscape&apos;s Future
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="text-2xl sm:text-3xl font-black text-pink-600 mb-4 sm:mb-6">
                  ${tier.price}
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {tier.perks.map((perk, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-sm sm:text-base text-gray-700 flex items-start"
                    >
                      <span className="text-pink-500 mr-2">•</span>
                      {perk}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-pink-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300"
                >
                  <Link href="/join" className="block w-full h-full flex items-center justify-center text-sm sm:text-base">
                    Join as {tier.name}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 sm:mt-12 md:mt-16 text-center"
        >
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
            Limited to only 20 founding members. Secure your spot today.
          </p>
          <p className="text-xs sm:text-sm text-purple-400">
            Payment = membership. No extra application needed.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
