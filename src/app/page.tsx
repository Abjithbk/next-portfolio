'use client'
import React from "react";
import ParticleBackground from "./components/effects/ParticleBackground";
import Navbar from "./components/navigation/Navbar";
import Hero from "./components/sections/Hero";
import StatsAndAbout from "./components/sections/StatsAndAbout";
import Skills from "./components/sections/Skills";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <StatsAndAbout />
      <Skills/>
    </main>
  );
}