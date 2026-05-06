import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { fadeIn, withReducedMotion } from "../utils/motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for enhanced blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      {...withReducedMotion(fadeIn)}
      className={`fixed z-50 w-full flex justify-between items-center py-4 px-4 sm:px-20 xl:px-32 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-bg-base/80 border-b border-border shadow-lg'
          : 'backdrop-blur-md bg-transparent border-b border-transparent'
      }`}
    >
      {/* LuminaAI Logo */}
      <motion.div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-text-primary group-hover:gradient-text transition-all duration-300">
          LuminaAI
        </span>
      </motion.div>

      {user ? (
        <div className="hover:ring-2 hover:ring-primary/60 rounded-full transition-all duration-200">
          <UserButton />
        </div>
      ) : (
        <motion.button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer gradient-primary text-text-primary px-8 py-2.5 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(124, 58, 237, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.nav>
  );
};

export default Navbar;
