'use client';

import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { machineFont, terminalFont } from '@/fonts';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SocialLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className={`${terminalFont.variable} font-terminal text-sm text-gray-400 hover:text-primary transition-colors`}>
    {children}
  </Link>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Header: Name left, Navbar right */}
      <header className="w-full bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className={`${machineFont.variable} font-machine text-xl md:text-2xl font-bold text-gray-100`}>
            VEDANT BARBHAYA
          </div>
          <Navbar />
        </div>
      </header>

      {/* Main content area with consistent margins */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-12 md:py-16">
        
        {/* Profile Intro Section: Photo left, Text right */}
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 my-12 md:my-16 lg:my-20">
          {/* Reverted to div placeholder for Profile Photo */}
          <Avatar className="w-32 h-32 md:w-36 md:h-36 border-2 border-primary">
            <AvatarImage src="/images/profile.jpg" alt="Vedant Barbhaya" />
            <AvatarFallback>VB</AvatarFallback>
          </Avatar>

          {/* Text content for Profile Intro */}
          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TypeAnimation
              sequence={[
                "Hey, I'm Vedant Barbhaya.",
                2000
              ]}
              wrapper="h1"
              speed={40}
              repeat={0} // Type once
              className={`${machineFont.variable} font-machine text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3`}
              cursor={true}
            />
            <TypeAnimation
              sequence={[
                1500, // Wait after first animation
                'I am a Machine Learning Engineer',
                2000,
                'I like to code.py',
                2000,
                'I enjoy solving complex problems',
                2000,
                'AI Enthusiast & Developer',
                2000,
              ]}
              wrapper="p"
              speed={50}
              repeat={Infinity}
              className={`${terminalFont.variable} font-terminal text-md sm:text-lg md:text-xl text-gray-300 mb-6 h-12 md:h-auto`} // Ensure min height for typing area
            />
            <div className="flex space-x-5 mt-2">
              <SocialLink href="#">Twitter</SocialLink>
              <SocialLink href="#">LinkedIn</SocialLink>
              <SocialLink href="#">GitHub</SocialLink>
              <SocialLink href="#">Instagram</SocialLink>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="my-16 md:my-20 lg:my-24">
          <h2 className={`${machineFont.variable} font-machine text-lg sm:text-xl font-bold text-gray-400 tracking-wider uppercase mb-6 pb-2 border-b border-gray-700`}>
            About Me
          </h2>
          <div className="bg-gray-900/60 p-6 md:p-8 rounded-lg shadow-xl backdrop-blur-sm">
            <div className={`${terminalFont.variable} font-terminal space-y-5 text-gray-300 text-sm md:text-base leading-relaxed`}>
              <p className="pl-3 border-l-2 border-primary/40">
                {'>'} As a Machine Learning Engineer, I thrive on transforming complex data into actionable insights and intelligent applications. My passion lies at the intersection of cutting-edge research and practical, real-world problem-solving.
              </p>
              <p className="pl-3 border-l-2 border-primary/40">
                {'>'} My toolkit is diverse, featuring Python, TensorFlow, and PyTorch, complemented by a strong understanding of various ML algorithms. I have a keen interest in Natural Language Processing and Computer Vision, constantly exploring new techniques to push the boundaries of AI.
              </p>
              <p className="pl-3 border-l-2 border-primary/40">
                {'>'} Beyond coding and model training, I dedicate time to delving into research papers, contributing to the open-source community, and sharing knowledge through technical discussions and articles. I believe in continuous learning and collaborative innovation.
              </p>
              <div className="pt-3 mt-4 border-t border-gray-700/50">
                <span className="text-primary">{'>'}</span> <span className="animate-pulse opacity-75">_</span>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder Sections for Projects, Blog, Contact */}
        {[ 'Projects', 'Blog', 'Contact'].map(section => (
          <section key={section} id={section.toLowerCase()} className="my-16 md:my-20 lg:my-24">
            <h2 className={`${machineFont.variable} font-machine text-lg sm:text-xl font-bold text-gray-400 tracking-wider uppercase mb-6 pb-2 border-b border-gray-700`}>
              {section}
            </h2>
            <div className="bg-gray-900/60 p-6 md:p-8 rounded-lg shadow-xl backdrop-blur-sm">
              <p className={`${terminalFont.variable} font-terminal text-gray-400`}>Content for {section.toLowerCase()} coming soon...</p>
            </div>
          </section>
        ))}

      </main>

      <footer className="w-full max-w-5xl mx-auto px-6 py-8 text-center">
        <p className={`${terminalFont.variable} font-terminal text-xs text-gray-500`}>
          &copy; {new Date().getFullYear()} Vedant Barbhaya. All rights reserved.
        </p>
      </footer>
    </div>
  );
}