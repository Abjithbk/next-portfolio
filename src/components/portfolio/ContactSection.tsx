import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function ContactSection() {
  return (
    <section id="contact" className="section reveal delay-2">
      <h2>Contact</h2>
      <div className="glass-card contact-wrap">
        <div>
          <p className="contact-lead">
            Let&apos;s create something that stands out. I am available for
            freelance work, internships, and collaborations.
          </p>
          <ul className="contact-list">
            <li>
              <Mail size={16} /> {profile.email}
            </li>
            <li>
              <MapPin size={16} /> {profile.location}
            </li>
          </ul>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Your name" />
          <input type="email" placeholder="Email address" />
          <textarea placeholder="Tell me about your idea" rows={4} />
          <button type="button" className="cta-primary">
            Send Message <ArrowUpRight size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
