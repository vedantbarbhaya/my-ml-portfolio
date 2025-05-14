'use client';

import React from 'react';
import Link from 'next/link';
import { machineFont } from '@/fonts';

const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center gap-5 md:gap-7">
        {['About', 'Projects', 'Blog', 'Contact'].map((item) => (
          <li key={item}>
            <Link 
              href={`/${item.toLowerCase()}`}
              className={`${machineFont.variable} font-machine text-sm md:text-base text-gray-300 hover:text-primary transition-colors duration-200 relative group`}
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;