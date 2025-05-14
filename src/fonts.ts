import { Rajdhani, Fira_Code } from 'next/font/google'
import localFont from 'next/font/local';

// Import installed fonts
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/space-mono';

export const headingFont = Rajdhani({ subsets: ['latin'], weight: ['400','700'], variable: '--font-heading' })
export const codeFont = Fira_Code({ subsets: ['latin'], weight: ['400'], variable: '--font-code' })

// Define a custom terminal-like font for machine aesthetics
export const machineFont = localFont({
  src: [
    {
      path: '../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-machine',
});

// Space Mono for terminal-like text
export const terminalFont = localFont({
  src: [
    {
      path: '../node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-terminal',
});