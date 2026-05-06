import React from 'react';
import { motion } from 'framer-motion';
import { assets } from "../assets/assets.js";
import { staggerContainer, staggerItem, fadeUp, withReducedMotion, viewportConfig } from '../utils/motion';

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
      rating: 4,
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator, TechCorp",
      content:
        "ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "David Lee",
      title: "Content Writer, TechCorp",
      content:
        "ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 4,
    },
  ];

  return (
    <div className="relative px-4 sm:px-20 xl:px-32 py-24 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="glow-orb-cyan top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb-violet top-3/4 right-1/3 translate-x-1/2 translate-y-1/2" />

      {/* Floating Particles */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 rounded-full bg-primary/40"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-3 h-3 rounded-full bg-accent/40"
        animate={{
          y: [0, -40, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-cyan-400/40"
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
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
          Loved by <span className="gradient-text">Creators</span>
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto text-lg">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </motion.div>

      {/* Testimonial Cards */}
      <motion.div
        variants={withReducedMotion(staggerContainer)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {dummyTestimonialData.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="p-6 glass rounded-[var(--radius-lg)] border-t border-white/10 transition-all duration-300"
            whileHover={{
              y: -6,
              borderColor: 'rgba(124, 58, 237, 0.3)',
              boxShadow: '0 0 16px rgba(124, 58, 237, 0.2)',
            }}
          >
            {/* Star Rating */}
            <div className="flex gap-1 mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                    className="w-5 h-5"
                    alt="star"
                  />
                ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-text-primary font-medium text-sm">
                  {testimonial.name}
                </h4>
                <p className="text-text-secondary text-xs">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonial;
