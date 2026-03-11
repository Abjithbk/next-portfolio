import { BriefcaseBusiness, Code2, GraduationCap } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function AboutSection() {
  return (
    <section id="about" className="section reveal delay-1">
      <h2>About</h2>
      <div className="two-col">
        <p>{profile.about}</p>
        <div className="info-grid">
          <article className="glass-card info-item">
            <Code2 size={18} />
            <h3>Tech Stack</h3>
            <p>Next.js, React, TypeScript, Node.js, MongoDB</p>
          </article>
          <article className="glass-card info-item">
            <GraduationCap size={18} />
            <h3>Education</h3>
            <p>B.Tech in Computer Science</p>
          </article>
          <article className="glass-card info-item">
            <BriefcaseBusiness size={18} />
            <h3>Goal</h3>
            <p>Build complete end-to-end products with strong UX</p>
          </article>
        </div>
      </div>
    </section>
  );
}
