import { ArrowUpRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { profile, stats } from "@/data/portfolio";

export default function HeroSection() {
  return (
    <section className="hero-grid">
      <div className="reveal delay-1">
        <p className="eyebrow">
          <Sparkles size={16} /> {profile.title}
        </p>
        <h1 className="hero-title">
          Crafting modern web experiences with motion, clarity, and code.
        </h1>
        <p className="hero-subtitle">{profile.intro}</p>

        <div className="hero-actions">
          <a href="#projects" className="cta-primary">
            View Projects <ArrowUpRight size={18} />
          </a>
          <a href="#" className="cta-ghost">
            Download Resume <Download size={18} />
          </a>
        </div>

        <div className="stats-row">
          {stats.map((item, index) => (
            <div
              className={`glass-card stat-card float-y ${index === 1 ? "delay-2" : ""} ${index === 2 ? "delay-3" : ""}`}
              key={item.label}
            >
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual reveal delay-2">
        <div className="glass-card profile-card">
          <div className="avatar-ring">
            <span>AB</span>
          </div>
          <h2>{profile.fullName}</h2>
          <p>{profile.location}</p>
          <div className="mini-links">
            <a href="#" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>
        <div className="floating-orb" aria-hidden="true" />
      </div>
    </section>
  );
}
