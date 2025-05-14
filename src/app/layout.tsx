// src/app/layout.tsx
import { headingFont, codeFont, machineFont, terminalFont } from '../fonts';
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '../components/ThemeToggle';
import { ReactNode } from 'react';
import "../styles/globals.css";

export const metadata = {
  title: 'Your Name – ML Engineer',
  description: 'Portfolio of Your Name, Machine Learning Engineer & AI Developer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${codeFont.variable} ${machineFont.variable} ${terminalFont.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="bg-gray-950 text-gray-100 antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen">
            {children}
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeToggle />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}