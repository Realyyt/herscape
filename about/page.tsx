import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02 }
};

export default function About() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Footer Card: Mission, Give-Back, Dubai, Donation CTA */}
            <motion.div className="col-span-1 md:col-span-4 bg-pink-100 rounded-2xl p-8 mt-2 shadow-md flex flex-col md:flex-row gap-8 items-stretch" variants={cardHover} initial="rest" whileHover="hover" animate="rest">
                {/* Left: Mission, Give-Back, Dubai */}
                <div className="flex-1 flex flex-col justify-center text-left gap-4">
                    <div>
    <div className="font-bold text-purple-900 text-lg mb-1">Why We're Doing This</div>
    <div className="text-purple-700 text-base mb-2">We believe that every woman deserves to build in an environment of clarity, beauty, and support. Herscape is our answer. But more than that:</div>
  </div>
  <div className="bg-pink-50/80 rounded-xl p-3 border border-pink-100 text-sm text-purple-700">
    <span className="font-bold text-pink-500">We're building a Give-Back Arm:</span> 10% of Herscape's profits will fund women-led businesses in underserved regions around the world. So your contribution isn't just for you — it's for women you may never meet, but whose lives you'll change.
  </div>
  <div>
    <div className="font-bold text-purple-900 text-lg mt-2 mb-1">Coming Soon: Herscape Dubai</div>
    <div className="text-purple-700 text-base mb-1">This is the flagship experience — happening soon in Dubai. <span className="text-pink-500 font-semibold">(Founding circle gets premium access when registration opens)</span></div>
    <ul className="text-purple-800 text-sm list-disc pl-5 space-y-1">
      <li>✨ Strategic business growth & workshops</li>
      <li>✨ Deep personal wellness & luxury experiences</li>
      <li>✨ Real global networking & media visibility</li>
      <li>✨ A breathtaking week of clarity, reconnection & purpose</li>
    </ul>
  </div>
</div>
{/* Right: Donation CTA */}
<div className="flex-1 flex flex-col justify-center items-end text-right gap-4">
  <div className="text-purple-700 text-base font-medium mb-2">Want to do more than join?</div>
  <Link to="/join" className="inline-block bg-white text-pink-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-300 border-2 border-pink-500 hover:border-pink-600 hover:text-pink-600">Support the Herscape Women's Fund</Link>
  <div className="text-xs text-purple-400 mt-1 max-w-xs">to directly support our mission of empowering women in underserved regions globally.</div>
</div>
</motion.div>       
</div>
    );
}