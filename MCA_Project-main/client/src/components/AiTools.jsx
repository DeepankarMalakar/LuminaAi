import React from 'react';
import { motion } from 'framer-motion';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { staggerContainer, staggerItem, fadeUp, withReducedMotion, viewportConfig } from '../utils/motion';

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className='relative px-4 sm:px-20 xl:px-32 my-24 overflow-hidden'>
      {/* Ambient Background Glows */}
      <div className="glow-orb-blue top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2" />
      <div className="glow-orb-violet bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2" />

      {/* Floating Particles - More scattered */}
      <motion.div
        className="absolute top-10 right-1/4 w-2 h-2 rounded-full bg-blue-400/50"
        animate={{
          y: [0, -35, 0],
          x: [0, 20, 0],
          opacity: [0.3, 0.9, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 left-10 w-3 h-3 rounded-full bg-violet-400/50"
        animate={{
          y: [0, -45, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-2 h-2 rounded-full bg-cyan-400/50"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-primary/60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 4.5,
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
        className='relative z-10 text-center mb-12'
      >
        <h2 className='text-text-primary text-5xl font-bold mb-4'>
          Powerful <span className="gradient-text">AI Tools</span>
        </h2>
        <p className='text-text-secondary max-w-lg mx-auto text-lg'>
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </motion.div>

      {/* Tool Cards Grid */}
      <motion.div
        variants={withReducedMotion(staggerContainer)}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
        className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'
      >
        {AiToolsData.map((tool, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className='p-8 glass rounded-[var(--radius-lg)] cursor-pointer group transition-all duration-300'
            style={{ boxShadow: 'var(--shadow-card)' }}
            whileHover={{
              y: -8,
              borderColor: `${tool.bg.from}80`,
              boxShadow: `0 0 24px ${tool.bg.from}40, var(--shadow-card)`,
            }}
            onClick={() => user && navigate(tool.path)}
          >
            {/* Icon Container */}
            <motion.div
              className='w-14 h-14 flex items-center justify-center rounded-xl mb-6'
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              transition={{ duration: 0.3 }}
            >
              <tool.Icon className='w-7 h-7 text-white' />
            </motion.div>

            {/* Content */}
            <h3 className='text-xl font-semibold text-text-primary mb-3'>
              {tool.title}
            </h3>
            <p className='text-text-secondary text-sm leading-relaxed'>
              {tool.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AiTools;
