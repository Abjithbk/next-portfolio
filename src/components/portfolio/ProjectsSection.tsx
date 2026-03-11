import { ExternalLink, Layers3 } from "lucide-react";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section reveal delay-3">
      <h2>Featured Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="glass-card project-item" key={project.title}>
            <div className="project-top">
              <Layers3 size={20} />
              <a
                href={project.href ?? "#"}
                className="icon-link"
                aria-label={`Open ${project.title}`}
              >
                <ExternalLink size={18} />
              </a>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
