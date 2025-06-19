import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FoundingCircle() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Call to Action/Contact Card */}
        <motion.div className="col-span-1 bg-pink-200 rounded-2xl p-6 flex flex-col justify-between shadow-md"  initial="rest" whileHover="hover" animate="rest">
          <div className="text-gray-700 text-sm mb-2">Be a Part of Herscape</div>
          <div className="flex-1 flex flex-col justify-end">
            <Link to="/join" className="text-2xl font-bold text-gray-900 hover:text-pink-500 transition flex items-center gap-2">🔗 Join the Founding Circle Now</Link>
            <div className="text-xs text-purple-400 mt-2">We are only selecting 20 women to begin this movement with. No forms. No hurdles. Just heart.</div>
            </div>
            </motion.div>
        </div>
    );
}