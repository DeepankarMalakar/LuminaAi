import React from "react";
import { motion } from 'framer-motion';
import { PricingTable } from '@clerk/clerk-react';
import { fadeUp, withReducedMotion, viewportConfig } from '../utils/motion';

const ENABLE_BILLING = import.meta.env.VITE_ENABLE_BILLING === 'true';

const Plan = () => {
  return (
    <div className="relative px-4 sm:px-20 xl:px-32 my-24 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="glow-orb-violet top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb-blue top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2" />

      {/* Floating Particles */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-violet-400/50"
        animate={{
          y: [0, -40, 0],
          x: [0, 25, 0],
          opacity: [0.3, 0.9, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-400/50"
        animate={{
          y: [0, -35, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-cyan-400/40"
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-primary/60"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Section Header */}
      <motion.div
        {...withReducedMotion(fadeUp)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="relative z-10 text-center mb-12"
      >
        <h2 className="text-text-primary text-5xl font-bold mb-4">
          Choose Your <span className="gradient-text">Plan</span>
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto text-lg">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </motion.div>

      {/* Pricing Table Container */}
      <motion.div
        {...withReducedMotion(fadeUp)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="relative z-10 glass rounded-[var(--radius-xl)] p-8 max-w-5xl mx-auto"
        style={{ boxShadow: 'var(--shadow-glow-primary)' }}
      >
        {ENABLE_BILLING ? (
          <PricingTable />
        ) : (
          <p className="text-center text-text-secondary">
            Billing is disabled for this environment. To preview the pricing
            table enable billing in Clerk or set `VITE_ENABLE_BILLING=true`.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Plan;
