'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tiers } from '@/lib/tiers';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CreditCard, CheckCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tier: string;
  company: string;
  linkedin: string;
  message: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

function JoinForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tier: 'test',
    company: '',
    linkedin: '',
    message: '',
    country: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'failed'>('pending');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSuccess = async (details: any) => {
    try {
      // Verify payment with our backend
      const response = await fetch('/api/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: details.id,
          action: 'verify'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setPaymentStatus('completed');
        setPaymentDetails(details);
        console.log('Payment verified:', result.data);
      } else {
        setPaymentStatus('failed');
        console.error('Payment verification failed:', result.message);
      }
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Payment verification error:', error);
    }
  };

  const handlePaymentError = (err: any) => {
    setPaymentStatus('failed');
    console.error('Payment error:', err);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (paymentStatus !== 'completed') {
      setSubmitStatus({ success: false, message: 'Please complete your payment before submitting the application.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({});
    
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          paymentDetails: paymentDetails
        })
      });
      const result = await response.json();
      if (result.success) {
        const selectedTier = tiers.find(t => t.id === formData.tier);
        const paymentAmount = selectedTier?.price || '$250';
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

  // Get selected tier details
  const selectedTier = tiers.find(t => t.id === formData.tier);

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
            
            {/* Payment Status Display */}
            {paymentStatus === 'completed' && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-semibold">Payment Completed Successfully!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">You can now submit your application.</p>
              </div>
            )}
            
            {paymentStatus === 'failed' && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <span className="text-red-800 font-semibold">Payment Failed</span>
                <p className="text-red-700 text-sm mt-1">Please try the payment again.</p>
              </div>
            )}
            
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

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 text-sm sm:text-base ${
                    errors.country ? 'border-red-300' : 'border-gray-200 focus:border-[#bdda57]'
                  }`}
                >
                  <option value="">Select your country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Austria">Austria</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Ireland">Ireland</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="India">India</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Peru">Peru</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Suriname">Suriname</option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Libya">Libya</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Chad">Chad</option>
                  <option value="Niger">Niger</option>
                  <option value="Mali">Mali</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Ivory Coast">Ivory Coast</option>
                  <option value="Togo">Togo</option>
                  <option value="Benin">Benin</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Central African Republic">Central African Republic</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Congo">Congo</option>
                  <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                  <option value="Angola">Angola</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Eswatini">Eswatini</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Reunion">Reunion</option>
                  <option value="China">China</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Laos">Laos</option>
                  <option value="Brunei">Brunei</option>
                  <option value="East Timor">East Timor</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Samoa">Samoa</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Palau">Palau</option>
                  <option value="Micronesia">Micronesia</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Israel">Israel</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Syria">Syria</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Iran">Iran</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Oman">Oman</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Greece">Greece</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Poland">Poland</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Romania">Romania</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="North Macedonia">North Macedonia</option>
                  <option value="Albania">Albania</option>
                  <option value="Kosovo">Kosovo</option>
                  <option value="Moldova">Moldova</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Russia">Russia</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="North Korea">North Korea</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.country}</p>}
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
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bdda57]/20 focus:border-[#bdda57] text-sm sm:text-base resize-none"
                  placeholder="Tell us why you want to join the Founding Circle..."
                />
              </div>

              {/* Payment Section */}
              <div className="border-t pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <CreditCard className="w-5 h-5 text-blue-500 mr-2" />
                    Complete Payment
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Payment Amount: <span className="font-bold text-[#bdda57]">{selectedTier?.price}</span>
                  </p>
                </div>
                
                {paymentStatus === 'pending' && (
                  <div className="flex justify-center">
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        const amount = (selectedTier?.price || 1).toString();
                        console.log('Creating PayPal order:', {
                          amount,
                          tier: selectedTier?.name,
                          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                          nodeEnv: process.env.NODE_ENV
                        });
                        
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                value: amount,
                                currency_code: "USD"
                              },
                              description: `Herscape Founding Circle - ${selectedTier?.name} Membership`,
                              custom_id: `${formData.email}_${formData.tier}`
                            }
                          ]
                        });
                      }}
                      onApprove={(data, actions) => {
                        console.log('PayPal order approved:', data);
                        if (actions.order) {
                          return actions.order.capture().then((details) => {
                            console.log('PayPal payment captured:', details);
                            handlePaymentSuccess(details);
                          });
                        }
                        return Promise.resolve();
                      }}
                      onError={(err) => {
                        console.error('PayPal error:', err);
                        handlePaymentError(err);
                      }}
                      style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "pay"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || paymentStatus !== 'completed'}
                className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isSubmitting || paymentStatus !== 'completed'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#bdda57] hover:bg-[#a3c563] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </div>
                ) : paymentStatus !== 'completed' ? (
                  'Complete Payment First'
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Founding Circle Benefits</h2>
              <p className="text-sm sm:text-base text-gray-600">Exclusive perks for our founding members</p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#bdda57] rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Lifetime Access</h3>
                  <p className="text-sm text-gray-600">Never pay for membership again</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#bdda57] rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Exclusive Events</h3>
                  <p className="text-sm text-gray-600">Priority access to all Herscape events</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#bdda57] rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Network Access</h3>
                  <p className="text-sm text-gray-600">Direct access to our exclusive network</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-[#bdda57] rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Founding Status</h3>
                  <p className="text-sm text-gray-600">Be recognized as a founding member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Join() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  
  if (!clientId) {
    console.error('PayPal Client ID not configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your .env.local file');
  }

  return (
    <PayPalScriptProvider options={{ 
      clientId: clientId || "test",
      currency: "USD",
      intent: "CAPTURE",
      // Force live mode if NODE_ENV is production
      ...(process.env.NODE_ENV === 'production' && {
        'data-client-id': clientId,
        'data-sdk-integration-source': 'button-factory'
      })
    }}>
      <JoinForm />
    </PayPalScriptProvider>
  );
}
