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
            You&apos;ve taken the first step toward joining the most influential women in women&apos;s entrepreneurship.
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Next Steps: Complete Your Registration</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-xl mx-auto">
              To finalize your <span className="font-semibold capitalize text-[#bdda57]">{successData.tier}</span> membership, please complete the payment below.
              An email with these instructions has been sent to <span className="font-semibold text-[#bdda57]">{successData.email}</span>.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-inner p-4 sm:p-6 border border-gray-200/80">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Payment Instructions
            </h3>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1">Total Amount</p>
              <p className="text-4xl sm:text-5xl font-bold text-gray-900">{successData.paymentAmount}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/90 text-sm sm:text-base">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <div className="font-semibold text-gray-600">Account Holder:</div>
                <div className="text-gray-900 font-medium">Salem Andero</div>
                
                <div className="font-semibold text-gray-600">Bank:</div>
                <div className="text-gray-900 font-medium">Wells Fargo Bank, N.A.</div>

                <div className="font-semibold text-gray-600">Account Number:</div>
                <div className="text-gray-900 font-medium">40630159095097994</div>

                <div className="font-semibold text-gray-600">Routing Number:</div>
                <div className="text-gray-900 font-medium">121000248</div>

                <div className="font-semibold text-gray-600">Account Type:</div>
                <div className="text-gray-900 font-medium">Checking</div>

                <div className="font-semibold text-gray-600">Address:</div>
                <div className="text-gray-900 font-medium">580 California Street, San Francisco, CA 94104, US</div>
              </div>
            </div>

            <div className="mt-6 text-center bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3">
                <p className="text-xs sm:text-sm text-yellow-800 font-semibold">
                  Note: This is a temporary payment method while we await company account approval.
                </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Having trouble? <a href="mailto:contact@herscape.org" className="font-semibold text-[#bdda57] hover:underline">Contact: contact@herscape.org</a>
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
