'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tiers } from '@/lib/tiers';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tier: string;
  company: string;
  linkedin: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Join() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tier: 'supporter',
    company: '',
    linkedin: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus({});
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        const paymentMatch = result.message.match(/\$(\d+)/);
        const paymentAmount = paymentMatch ? `$${paymentMatch[1]}` : '$50';
        setSubmitStatus({ success: true, message: 'Application submitted successfully! Redirecting...' });
        setTimeout(() => {
          router.push(`/success?firstName=${encodeURIComponent(formData.firstName)}&lastName=${encodeURIComponent(formData.lastName)}&email=${encodeURIComponent(formData.email)}&tier=${encodeURIComponent(formData.tier)}&paymentAmount=${encodeURIComponent(paymentAmount)}&message=${encodeURIComponent(result.message)}`);
        }, 1500);
      } else {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
        } else {
          setSubmitStatus({ success: false, message: result.message });
        }
      }
    } catch {
      setSubmitStatus({ success: false, message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f7ffe5] via-[#f0f9e8] to-[#e8f5e0] flex flex-col items-center py-8 sm:py-12 md:py-16 px-3 sm:px-4">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6 shadow-lg">
            <span className="text-xs sm:text-sm font-semibold text-[#bdda57] tracking-wider uppercase">Exclusive Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 text-gray-900">
            Join the Herscape
            <span className="block text-[#bdda57]">Founding Circle</span>
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 sm:mb-4 font-light max-w-3xl mx-auto">
            <span className="text-[#bdda57] font-bold">Legacy Access:</span> Be one of the first 20 women to shape Herscape&apos;s future.
          </div>
          <div className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            An exclusive invitation to join the most influential women in women&apos;s entrepreneurship
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Form Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Application Form</h2>
              <p className="text-sm sm:text-base text-gray-600">Complete your exclusive membership application</p>
            </div>
            {/* Success/Error Message Display */}
            {submitStatus.message && (
              <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl ${
                submitStatus.success 
                  ? 'bg-green-50 border-2 border-green-200 text-green-800' 
                  : 'bg-red-50 border-2 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center">
                  {submitStatus.success ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-medium text-sm sm:text-base">{submitStatus.message}</span>
                  {submitStatus.success && (
                    <div className="ml-2 animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-green-600"></div>
                  )}
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 text-sm sm:text-base ${
                      errors.firstName ? 'border-red-300' : 'border-gray-200 focus:border-[#bdda57]'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 text-sm sm:text-base ${
                      errors.lastName ? 'border-red-300' : 'border-gray-200 focus:border-[#bdda57]'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 text-sm sm:text-base ${
                      errors.email ? 'border-red-300' : 'border-gray-200 focus:border-[#bdda57]'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 text-sm sm:text-base ${
                      errors.phone ? 'border-red-300' : 'border-gray-200 focus:border-[#bdda57]'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Company/Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 focus:border-[#bdda57] text-sm sm:text-base"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 focus:border-[#bdda57] text-sm sm:text-base"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Membership Tier *</label>
                <div className="grid gap-3 sm:gap-4">
                  {tiers.map((tier) => (
                    <label key={tier.id} className="flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#bdda57] transition-all duration-200">
                      <input
                        type="radio"
                        name="tier"
                        value={tier.id}
                        checked={formData.tier === tier.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        formData.tier === tier.id ? 'border-[#bdda57] bg-[#bdda57]' : 'border-gray-300'
                      }`}>
                        {formData.tier === tier.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-gray-900">{tier.name}</span>
                          <span className="text-2xl font-bold text-[#bdda57]">{tier.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{tier.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Why do you want to join Herscape? (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 focus:border-[#bdda57] resize-none text-sm sm:text-base"
                  placeholder="Tell us about your vision for women's entrepreneurship..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#bdda57] to-[#a8c94a] text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold hover:from-[#a8c94a] hover:to-[#bdda57] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-gray-900 mr-2"></div>
                    <span className="text-sm sm:text-base">Processing Application...</span>
                  </div>
                ) : (
                  'Submit Exclusive Application'
                )}
              </button>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Founding Member Perks</h2>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  'Lifetime perks & discounts for all future Herscape programs',
                  'Your name etched in history as one of our founding women',
                  'Exclusive merch (custom journal, identity package & Herscape token)',
                  'Priority access to investor/pitch circles before others',
                  'Board or Gold Club eligibility (for high-tier supporters)',
                  'The pride of being one of 20 women who helped birth Herscape'
                ].map((perk, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#bdda57] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Why Join?</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4">
                10% of Herscape&apos;s profits will fund women-led businesses in underserved regions around the world. Your contribution isn&apos;t just for you — it&apos;s for women you may never meet, but whose lives you&apos;ll change.
              </p>
              <div className="bg-[#eaffd0] rounded-xl p-3 sm:p-4">
                <p className="text-sm sm:text-base text-gray-800 font-medium">
                  We are only selecting 20 women to begin this movement with. No forms. No hurdles. Just heart.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#bdda57] to-[#a8c94a] rounded-3xl p-4 sm:p-6 md:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Limited Time Opportunity</h3>
              <p className="text-sm sm:text-base text-gray-800 mb-4 sm:mb-6">
                Only 20 spots available. Once filled, this exclusive founding circle will be closed forever.
              </p>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">20</div>
              <div className="text-sm sm:text-base text-gray-800">Exclusive Spots Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
