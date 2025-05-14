import React from 'react';
import Link from 'next/link';
import { machineFont } from '@/fonts';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center">
      <ul className="flex items-center space-x-8 md:space-x-12">
        {['About', 'Projects', 'Blog', 'Contact'].map((item) => (
          <li key={item}>
            <Link 
              href={`/${item.toLowerCase()}`}
              className={`${machineFont.variable} font-machine text-base md:text-lg px-2 py-1 text-gray-400 hover:text-primary transition-colors relative group`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

