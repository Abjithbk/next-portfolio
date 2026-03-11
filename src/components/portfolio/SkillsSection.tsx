import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" className="section reveal delay-2">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="glass-card skill-item" key={skill.name}>
            <div className="skill-head">
              <h3>{skill.name}</h3>
              <span>{skill.level}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${skill.level}%` }}
                aria-hidden="true"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
