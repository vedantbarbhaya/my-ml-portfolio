'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { terminalFont } from '@/fonts';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // After component mounts, we can safely show the UI that depends on client-side features
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <button
        className={`${terminalFont.variable} font-terminal bg-gray-800/70 backdrop-blur border border-primary/30 
          px-3 py-2 rounded text-sm text-primary hover:bg-gray-700/70 transition-colors`}
        aria-label="Loading theme toggle"
      >
        {"> theme"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`${terminalFont.variable} font-terminal bg-gray-800/70 backdrop-blur border border-primary/30 
        px-3 py-2 rounded text-sm text-primary hover:bg-gray-700/70 transition-colors`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '> light_mode' : '> dark_mode'}
    </button>
  );
};

export default ThemeToggle;
