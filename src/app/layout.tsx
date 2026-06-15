import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Toaster } from "react-hot-toast";
// Ignore TS error when importing global CSS in Next.js app directory
// @ts-ignore 
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased bg-background text-white">
        {/* Global Toast Notifications - Styled to match your dark theme */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#051424', // Matches your background
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#00f0ff', // Cyan checkmark
                secondary: '#051424',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4d4f', // Red error icon
                secondary: '#051424',
              },
            },
          }}
        />
        
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}