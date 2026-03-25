// Skills — Solution types section for About page
import { IndustryRow } from "./Industries";

const SKILLS_LEFT = [
  "Enterprise Software",
  "Data & Analytics Platforms",
  "Design Systems",
  "Web Applications",
] as const;

const SKILLS_RIGHT = [
  "Dashboards & Visualisation",
  "APIs & Integrations",
  "Internal Tooling",
  "Human-Machine Interfaces",
] as const;

const SKILLS_STATEMENT =
  "Every choice was justified by how the problem needed to be solved — not by what was easiest to build.";

export function Skills() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mb-16">
        <div>
          {SKILLS_LEFT.map((name) => (
            <IndustryRow key={name} name={name} />
          ))}
        </div>
        <div>
          {SKILLS_RIGHT.map((name) => (
            <IndustryRow key={name} name={name} />
          ))}
        </div>
      </div>

      <p
        className="font-display font-light text-text-primary"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          maxWidth: "600px",
          lineHeight: 1.3,
        }}
      >
        "{SKILLS_STATEMENT}"
      </p>
    </>
  );
}
