import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { LINKEDIN_URL } from "~/lib/constants";

const HEADING_1_PREFIX = "The right ";
const HEADING_1_WORD = "problem.";
const HEADING_2_PREFIX = "The right ";
const HEADING_2_WORD = "partnership.";
const BODY =
  "Open to the right full-time leadership roles and consulting partnerships. If the problem sits at the intersection of design, data, and technology — let's talk.";
const LABEL_CONTACT = "Contact form →";
const LABEL_LINKEDIN = "LinkedIn →";
const HREF_CONTACT = "/contact";

const headlineStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(32px, 5vw, 64px)",
  color: "#E5E2E1",
  lineHeight: 0.95,
  display: "block",
};

const bodyStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  fontSize: "16px",
  color: "#5a5a58",
  maxWidth: "480px",
  lineHeight: 1.75,
  marginTop: "16px",
};

const contactLinkStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "14px",
  color: "#FFB77D",
  textDecoration: "none",
};

const linkedinLinkStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "14px",
  color: "#5a5a58",
  textDecoration: "none",
};

export function ContactStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("contact-in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
      className="bg-bg"
    >
      <div className="max-w-container mx-auto px-margin-mob md:px-margin">
        <p style={headlineStyle}>
          {HEADING_1_PREFIX}
          <span className="contact-highlight contact-highlight--accent">{HEADING_1_WORD}</span>
        </p>
        <p style={headlineStyle}>
          {HEADING_2_PREFIX}
          <span className="contact-highlight contact-highlight--deep">{HEADING_2_WORD}</span>
        </p>

        <p style={bodyStyle}>{BODY}</p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            marginTop: "40px",
          }}
        >
          <Link
            to={HREF_CONTACT}
            style={contactLinkStyle}
            className="contact-strip-link contact-strip-link--accent contact-cta-link"
          >
            {LABEL_CONTACT}
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={linkedinLinkStyle}
            className="contact-strip-link contact-strip-link--muted contact-cta-link"
          >
            {LABEL_LINKEDIN}
          </a>
        </div>
      </div>
    </section>
  );
}
