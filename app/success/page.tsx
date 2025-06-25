'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Users, Star } from 'lucide-react';

interface SuccessData {
  firstName: string;
  lastName: string;
  tier: string;
  paymentAmount: string;
  message: string;
  email: string;
}

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  useEffect(() => {
    // Get data from URL params
    const data: SuccessData = {
      firstName: searchParams.get('firstName') || '',
      lastName: searchParams.get('lastName') || '',
      tier: searchParams.get('tier') || 'supporter',
      paymentAmount: searchParams.get('paymentAmount') || '$50',
      message: searchParams.get('message') || '',
      email: searchParams.get('email') || '',
    };
    if (data.firstName && data.lastName && data.email) {
      setSuccessData(data);
    } else {
      // If no data, redirect back to join page
      router.replace('/join');
    }
  }, [searchParams, router]);

  if (!successData) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f7ffe5] via-[#f0f9e8] to-[#e8f5e0] flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-3 sm:px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#bdda57]/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 sm:w-24 sm:h-24 bg-[#bdda57]/15 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-[#bdda57]/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4 sm:mb-6 shadow-2xl"
          >
            <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 text-gray-900">
            Welcome to the
            <span className="block text-[#bdda57]">Founding Circle!</span>
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 sm:mb-4 font-light">
            Congratulations, <span className="font-bold text-[#bdda57]">{successData.firstName} {successData.lastName}</span>!
          </div>
          <div className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            You&apos;ve successfully joined the most influential women in women&apos;s entrepreneurship.
          </div>
        </motion.div>
        
        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 w-full"
        >
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome to Herscape!</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-xl mx-auto">
              Your <span className="font-semibold capitalize text-[#bdda57]">{successData.tier}</span> membership has been activated successfully.
              A welcome email has been sent to <span className="font-semibold text-[#bdda57]">{successData.email}</span>.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-inner p-4 sm:p-6 border border-gray-200/80">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Membership Confirmed
            </h3>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1">Welcome to the</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">{successData.tier} Tier</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">Membership Active</p>
              <p className="text-green-700 text-sm mt-1">You&apos;re now part of the Herscape family!</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Thank you for joining the Herscape Founding Circle! We&apos;ll be in touch soon with your exclusive member benefits.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Questions? <a href="mailto:contact@herscape.org" className="font-semibold text-[#bdda57] hover:underline">Contact: contact@herscape.org</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Success() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
