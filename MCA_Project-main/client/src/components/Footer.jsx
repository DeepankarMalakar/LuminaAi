import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Preserve existing subscribe logic
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className='bg-bg-surface border-t border-border relative'>
      {/* Top glow line */}
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent' />

      <div className='px-4 sm:px-20 xl:px-32 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">
                LuminaAI
              </span>
            </div>
            <p className='text-text-secondary text-sm leading-relaxed'>
              Experience the power of AI-driven content creation with our suite of
              premium tools. From writing articles to generating images, we
              provide everything you need to enhance your workflow and create
              amazing content effortlessly.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className='text-text-primary font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <a href="#" className='text-text-secondary hover:text-primary transition text-sm'>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className='text-text-secondary hover:text-primary transition text-sm'>
                  About us
                </a>
              </li>
              <li>
                <a href="#" className='text-text-secondary hover:text-primary transition text-sm'>
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className='text-text-secondary hover:text-primary transition text-sm'>
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-text-primary font-semibold mb-4'>Subscribe to our newsletter</h3>
            <p className='text-text-secondary text-sm mb-4'>
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form onSubmit={handleSubscribe} className='flex gap-2'>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className='flex-1 px-4 py-2 glass rounded-lg text-text-primary text-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/60'
                required
              />
              <button
                type="submit"
                className='gradient-primary text-text-primary px-6 py-2 rounded-lg text-sm font-medium hover:glow-primary transition'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-8 border-t border-border text-center'>
          <p className='text-text-secondary text-sm'>
            Copyright 2026 © LuminaAI. All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
