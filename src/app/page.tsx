'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { machineFont, terminalFont } from '@/fonts';
import Link from 'next/link';

// Simple icons for social links (can be replaced with actual SVGs or an icon library)
const SocialLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className={`${terminalFont.variable} font-terminal text-gray-400 hover:text-primary transition-colors`}>
    {children}
  </Link>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col px-4 sm:px-6 lg:px-8">
      {/* Header - Centered Navbar */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
        <div className="container mx-auto flex justify-center">
          <Navbar />
        </div>
      </header>

      {/* Main content area with margins */}
      <main className="flex-grow container mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-12 max-w-5xl">
        
        {/* Profile Intro Section */}
        <section className="my-12 md:my-16 lg:my-20">
          {/* Profile section: photo beside typing animations */}
          <motion.div
            className="flex flex-col items-center md:flex-row md:justify-center md:items-center gap-6 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Small circular photo */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-primary overflow-hidden">
              {/* You'll need to replace this with your actual image */}
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-sm text-neutral-400">
                Your Photo
                <br />
                (public/images/profile.jpg)
              </div>
            </div>
            
            {/* Decorative border */}
            <div className="absolute -inset-1 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
          </motion.div>

          {/* Typing animations */}
          <div className="flex flex-col items-center">
            {/* Name typing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              <TypeAnimation
                sequence={[
                  "Hey, I'm Vedant Barbhaya.",
                  1000
                ]}
                wrapper="h1"
                speed={50}
                repeat={1}
                className={`${machineFont.variable} font-machine text-3xl sm:text-4xl md:text-5xl font-bold text-primary`}
              />
            </motion.div>
            
            {/* Interests typing */}
            <motion.div
              className="h-8 text-lg md:text-xl text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TypeAnimation
                sequence={[
                  'I like to code.py',
                  1500,
                  'I love football',
                  1500,
                  'I am a Machine Learning Engineer',
                  1500,
                  'AI Enthusiast',
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className={`${terminalFont.variable} font-terminal`}
              />
            </motion.div>
          </div>
          
          {/* Social links */}
          <motion.div 
            className="flex justify-center space-x-6 md:space-x-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SocialLink href="#">Twitter</SocialLink>
            <SocialLink href="#">Instagram</SocialLink>
            <SocialLink href="#">LinkedIn</SocialLink>
            <SocialLink href="#">GitHub</SocialLink>
          </motion.div>
        </section>

        {/* About Section - Better formatted */}
        <section id="about" className="my-12 md:my-16 lg:my-20">
          <h2 className={`${machineFont.variable} font-machine text-xl sm:text-2xl font-bold mb-8 text-gray-400 tracking-wider uppercase`}>
            About Me
          </h2>
          
          {/* Shadcn Card or styled container */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className={`${terminalFont.variable} font-terminal space-y-4 text-gray-300 text-base md:text-lg leading-relaxed`}>
              <p className="pl-4 border-l-2 border-primary/30">
                {'>'} I&apos;m a Machine Learning Engineer with a passion for developing intelligent systems.
                My expertise lies in combining theoretical knowledge with practical implementation
                to solve real-world problems.
              </p>
              
              <p className="pl-4 border-l-2 border-primary/30">
                {'>'} My technical toolkit includes Python, TensorFlow, PyTorch, and various ML algorithms.
                I specialize in computer vision and natural language processing applications.
              </p>
              
              <p className="pl-4 border-l-2 border-primary/30">
                {'>'} When I&apos;m not training models or tuning hyperparameters, you can find me 
                exploring the latest research papers, contributing to open-source projects, 
                or sharing my knowledge through technical articles.
              </p>
              
              <div className="pt-4 mt-6 border-t border-gray-700">
                <span className="text-primary">{'>'}</span> <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder for Future Sections (Projects, Blog, etc.) */}
        <section id="projects" className="my-12 md:my-16 lg:my-20">
          <h2 className={`${machineFont.variable} font-machine text-xl sm:text-2xl font-bold mb-6 text-gray-400 tracking-wider uppercase`}>
            Projects
          </h2>
          <p className={`${terminalFont.variable} font-terminal text-gray-400`}>Coming soon...</p>
        </section>

        <section id="blog" className="my-12 md:my-16 lg:my-20">
          <h2 className={`${machineFont.variable} font-machine text-xl sm:text-2xl font-bold mb-6 text-gray-400 tracking-wider uppercase`}>
            Blog
          </h2>
          <p className={`${terminalFont.variable} font-terminal text-gray-400`}>Coming soon...</p>
        </section>

        <section id="contact" className="my-12 md:my-16 lg:my-20">
          <h2 className={`${machineFont.variable} font-machine text-xl sm:text-2xl font-bold mb-6 text-gray-400 tracking-wider uppercase`}>
            Contact
          </h2>
          <p className={`${terminalFont.variable} font-terminal text-gray-400`}>Coming soon...</p>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className={`${terminalFont.variable} font-terminal text-sm text-gray-500`}>
          &copy; {new Date().getFullYear()} Vedant Barbhaya. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
