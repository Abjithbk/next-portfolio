import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" className="section js-reveal">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="glass-card glass glass-hover skill-item js-stagger" key={skill.name}>
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
