// Respect user's motion preferences
const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base animation config
const baseTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1], // Custom easing curve
};

// Fade in from opacity 0 to 1
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: baseTransition,
};

// Fade up: fade in + translate Y
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
  transition: baseTransition,
};

// Scale in: scale + opacity
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: baseTransition,
};

// Slide in from left
export const slideInLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: baseTransition,
};

// Stagger container: animates children sequentially
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item: used inside staggerContainer
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

// Wrapper function to disable animations if user prefers reduced motion
export const withReducedMotion = (variant) => {
  if (shouldReduceMotion()) {
    return {
      initial: variant.animate,
      animate: variant.animate,
      exit: variant.animate,
    };
  }
  return variant;
};

// Viewport animation config for scroll-triggered animations
export const viewportConfig = {
  once: true,
  amount: 0.3,
  margin: "-100px",
};
