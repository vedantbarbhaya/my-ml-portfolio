'use client';

import React from 'react';
import { machineFont, terminalFont } from '@/fonts';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center">
      <h1 className={`${machineFont.variable} font-machine text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8`}>
        Blog
      </h1>
      <p className={`${terminalFont.variable} font-terminal text-lg md:text-xl text-gray-300`}>
        This is the blog page. Content coming soon...
      </p>
    </div>
  );
}
