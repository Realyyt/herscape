import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, CreditCard, Users, Star, ArrowRight, Copy, Check } from 'lucide-react';

interface SuccessData {
  firstName: string;
  lastName: string;
  tier: string;
  paymentAmount: string;
  message: string;
  email: string;
}

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    // Get data from location state or URL params
    const data = location.state?.successData;
    if (data) {
      setSuccessData(data);
    } else {
      // If no data, redirect back to join page
      navigate('/join');
    }
  }, [location, navigate]);

  useEffect(() => {
    // Animate through steps
    const timer = setTimeout(() => {
      setCurrentStep(1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const bankDetails = {
    accountHolder: 'Salem Andero',
    bankName: 'Wells Fargo Bank, N.A.',
    accountNumber: '40630159095097994',
    routingNumber: '121000248',
    accountType: 'Checking',
    address: '580 California Street, San Francisco, CA 94104, US'
  };

  if (!successData) {
    return null;
  }

  const tierInfo = {
    supporter: {
      name: 'Supporter',
      color: 'from-green-400 to-green-600',
      icon: <Users className="w-8 h-8" />,
      benefits: ['Lifetime perks & discounts', 'Name etched in history', 'Exclusive merch package']
    },
    pioneer: {
      name: 'Pioneer',
      color: 'from-blue-400 to-blue-600',
      icon: <Star className="w-8 h-8" />,
      benefits: ['All Supporter perks', 'Priority access to pitch circles', 'Exclusive events access']
    },
    angel: {
      name: 'Angel',
      color: 'from-purple-400 to-purple-600',
      icon: <Star className="w-8 h-8" />,
      benefits: ['All Pioneer perks', 'Gold Club/Board eligibility', 'VIP status & recognition']
    }
  };

  const currentTier = tierInfo[successData.tier as keyof typeof tierInfo];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f7ffe5] via-[#f0f9e8] to-[#e8f5e0] flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-[#bdda57]/20 rounded-full"
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
          className="absolute bottom-20 right-10 w-24 h-24 bg-[#bdda57]/15 rounded-full"
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
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#bdda57]/10 rounded-full"
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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-2xl"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900">
            Welcome to the
            <span className="block text-[#bdda57]">Founding Circle!</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-700 mb-4 font-light">
            Congratulations, <span className="font-bold text-[#bdda57]">{successData.firstName} {successData.lastName}</span>!
          </div>
          
          <div className="text-lg text-gray-600 max-w-2xl mx-auto">
            You've taken the first step toward joining the most influential women in women's entrepreneurship.
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
        >
          {/* Tier Information */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${currentTier.color} rounded-full mb-4 shadow-lg`}>
              {currentTier.icon}
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              {currentTier.name} Membership
            </h2>
            <p className="text-gray-600">You've selected the perfect tier for your journey</p>
          </div>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Payment Step */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
              </div>
              <p className="text-gray-700 mb-4">
                To finalize your membership, please send <span className="font-bold text-blue-600">{successData.paymentAmount}</span> to our temporary payment account:
              </p>
              <div className="bg-white rounded-xl p-6 border border-blue-200 space-y-3">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-1">Temporary Payment Method</p>
                  <p className="text-xs text-gray-500">(While we await company account approval)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-700">Account Holder:</p>
                      <p className="text-gray-900">{bankDetails.accountHolder}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountHolder, 'accountHolder')}
                      className="ml-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {copiedField === 'accountHolder' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-700">Bank Name:</p>
                      <p className="text-gray-900">{bankDetails.bankName}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.bankName, 'bankName')}
                      className="ml-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {copiedField === 'bankName' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-700">Account Number:</p>
                      <p className="font-mono text-gray-900">{bankDetails.accountNumber}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
                      className="ml-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {copiedField === 'accountNumber' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-700">Routing Number:</p>
                      <p className="font-mono text-gray-900">{bankDetails.routingNumber}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.routingNumber, 'routingNumber')}
                      className="ml-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {copiedField === 'routingNumber' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="md:col-span-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-700">Account Type:</p>
                      <p className="text-gray-900">{bankDetails.accountType}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.accountType, 'accountType')}
                      className="ml-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {copiedField === 'accountType' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="md:col-span-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-700">Address:</p>
                      <p className="text-gray-900">{bankDetails.address}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankDetails.address, 'address')}
                      className="ml-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {copiedField === 'address' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700 text-center mb-3">
                    <strong>Note:</strong> Please include your name in the payment memo/reference for proper tracking.
                  </p>
                  <button
                    onClick={() => copyToClipboard(
                      `Bank Transfer Details for Herscape Founding Circle Membership:\n\n` +
                      `Account Holder: ${bankDetails.accountHolder}\n` +
                      `Bank Name: ${bankDetails.bankName}\n` +
                      `Account Number: ${bankDetails.accountNumber}\n` +
                      `Routing Number: ${bankDetails.routingNumber}\n` +
                      `Account Type: ${bankDetails.accountType}\n` +
                      `Address: ${bankDetails.address}\n\n` +
                      `Amount: ${successData.paymentAmount}\n` +
                      `Please include your name in the payment memo/reference.`,
                      'allDetails'
                    )}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    {copiedField === 'allDetails' ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied All Details!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy All Bank Details
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Confirmation Step */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 flex flex-col space-y-4"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Email Confirmation Sent</h3>
              </div>
              <p className="text-gray-700">
                We've sent a detailed confirmation email to <span className="font-semibold text-green-600">{successData.email}</span> with all your application details and payment instructions.
              </p>
              <div className="bg-white rounded-xl p-4 border border-green-200">
                <p className="text-sm text-gray-600 text-center">
                  Check your inbox (and spam folder) for the confirmation email
                </p>
              </div>
            </motion.div>
          </div>

          {/* Benefits Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-gradient-to-br from-[#bdda57]/10 to-[#bdda57]/5 rounded-2xl p-6 border border-[#bdda57]/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Your {currentTier.name} Benefits</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {currentTier.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-[#bdda57]/20 text-center"
                >
                  <div className="w-8 h-8 bg-[#bdda57] rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#bdda57] to-[#a8c94a] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
          
          <Link
            to="/join"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full border-2 border-[#bdda57] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Apply Again
          </Link>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-lg">
            Thank you for joining the Herscape Founding Circle. Your journey to empowerment starts now! ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
} 