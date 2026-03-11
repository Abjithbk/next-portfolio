import { experience } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section className="section reveal delay-1">
      <h2>Experience</h2>
      <div className="timeline">
        {experience.map((item) => (
          <article className="glass-card timeline-item" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <span>{item.period}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
