import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Toaster } from "react-hot-toast";
import { CustomCursor } from "./components/sections/customCursor";
import { ScrollProgress } from "./components/sections/scrollProgress";
import { KonamiEgg } from "./components/sections/konamiEgg";
import "./globals.css";
import { Navbar } from "./components/navigation/Navbar";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Abjith B K | Portfolio",
  description: "Full Stack Developer & AI/ML Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-background text-foreground">
        {/* Grain overlay for texture */}
        <div className="grain-overlay" />
        
        {/* Grid lines background */}
        <div className="fixed inset-0 grid-lines pointer-events-none z-0" />
        
        {/* Global UI Components */}
        <Navbar />
        <ScrollProgress />
        <CustomCursor />
        <KonamiEgg />
        
        {/* Global Toast Notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: 'var(--primary)',
                secondary: 'var(--card)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--destructive)',
                secondary: 'var(--card)',
              },
            },
          }}
        />
        
        <ReactLenis root>
          <div className="relative z-10">
            {children}
          </div>
        </ReactLenis>
      </body>
    </html>
  );
}