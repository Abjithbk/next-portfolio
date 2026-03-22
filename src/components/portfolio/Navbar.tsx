import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="glass-nav glass">
      <a href="#home" className="brand-title">
        Abjith <span className="text-accent">BK</span>
      </a>

      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="cta-ghost glass-hover" href="#contact">
        Let&apos;s Talk <ArrowUpRight size={16} />
      </a>
    </header>
  );
}
