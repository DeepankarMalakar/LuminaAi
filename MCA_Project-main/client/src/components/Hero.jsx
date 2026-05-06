import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";
import { staggerContainer, staggerItem, withReducedMotion } from "../utils/motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col w-full justify-center items-center min-h-screen px-4 sm:px-20 xl:px-32 animated-gradient overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="glow-orb-violet top-0 left-0" />
      <div className="glow-orb-blue bottom-0 right-0" />

      {/* Animated blob shapes */}
      <motion.div
        className="blob-shape absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="blob-shape absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="blob-shape absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Floating particles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-primary/60"
        animate={{
          y: [0, -50, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-accent/60"
        animate={{
          y: [0, -60, 0],
          x: [0, 30, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-cyan-400/60"
        animate={{
          y: [0, -40, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        variants={withReducedMotion(staggerContainer)}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={staggerItem}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-light rounded-full border border-primary/30 text-sm text-text-secondary shimmer"
        >
          <span className="text-primary">✦</span>
          Next-Generation AI Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={staggerItem}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] mb-4 text-text-primary"
        >
          Create amazing content <br />
          with <span className="gradient-text">AI tools</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={staggerItem}
          className="mt-4 max-w-[560px] mx-auto text-lg text-text-secondary"
        >
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerItem}
          className="flex flex-wrap justify-center gap-4 mt-8 text-sm"
        >
          <motion.button
            onClick={() => navigate('/ai')}
            className="gradient-primary text-text-primary px-10 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(124, 58, 237, 0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            Start Creating Now
          </motion.button>
          <motion.button
            className="glass px-10 py-3 rounded-lg font-medium text-text-primary"
            whileHover={{ scale: 1.03, borderColor: 'rgba(124, 58, 237, 0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={staggerItem}
          className="flex items-center gap-4 mt-8 mx-auto justify-center text-text-secondary"
        >
          <img src={assets.user_group} alt="User group" className="h-8" />
          Trusted by 10,000+ creators
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
