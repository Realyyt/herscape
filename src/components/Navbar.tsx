'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar & Slide-Up Menu */}
      <div className="sm:hidden">
        {/* The bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-black z-50">
          <div className="flex justify-between items-center h-full px-4">
              <Link href="/" className="font-black text-lg">HERSCAPE</Link>
              <Link href="/join" className="border border-black rounded-full px-4 py-2 text-sm font-bold">GET IN TOUCH</Link>
              <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              </button>
          </div>
        </div>
        {/* The slide-up overlay menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMenuOpen(false)}
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
                  <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Link href="/about" className="text-2xl font-bold py-2" onClick={() => setMenuOpen(false)}>ABOUT</Link>
                  <Link href="/community" className="text-2xl font-bold py-2" onClick={() => setMenuOpen(false)}>COMMUNITY</Link>
                  <Link href="/events" className="text-2xl font-bold py-2" onClick={() => setMenuOpen(false)}>EVENTS</Link>
                  <Link href="/join" className="text-2xl font-bold py-2" onClick={() => setMenuOpen(false)}>JOIN</Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden sm:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 bg-white border border-black rounded-full px-2 sm:px-4 py-2 shadow-lg">
          <Link href="/" className=" text-sm sm:text-sm mr-4 whitespace-nowrap">HERSCAPE</Link>
          <Link href="/about" className="px-2 sm:px-3 py-1 rounded-full hover:bg-black hover:text-white transition text-xs sm:text-sm whitespace-nowrap">ABOUT</Link>
          <Link href="/community" className="px-2 sm:px-3 py-1 rounded-full hover:bg-black hover:text-white transition text-xs sm:text-sm whitespace-nowrap">COMMUNITY</Link>
          <Link href="/events" className="px-2 sm:px-3 py-1 rounded-full hover:bg-black hover:text-white transition text-xs sm:text-sm whitespace-nowrap">EVENTS</Link>
          <Link href="/join" className="px-2 sm:px-3 py-1 rounded-full hover:bg-black hover:text-white transition text-xs sm:text-sm whitespace-nowrap">JOIN</Link>
          <Link href="/join" className="ml-2 border border-black rounded-full px-2 sm:px-3 py-1 text-xs font-bold whitespace-nowrap">GET IN TOUCH</Link>
        </div>
      </div>
    </>
  );
} 