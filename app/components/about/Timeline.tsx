// Timeline — Career history section for About page

const EXPERIENCE = [
  {
    years: "2022 — PRESENT",
    company: "frog, part of Capgemini Invent",
    title: "LEAD DESIGN TECHNOLOGIST · MANAGER",
    description:
      "Leading cross-functional teams across digital transformation programmes. Built and leads the frog Norway Customer Data & Technology capability. Solution Architect, Team Lead, and craft mentor across design, engineering, and AI integration.",
  },
  {
    years: "2019 — 2022",
    company: "Webstep",
    title: "SENIOR DEVELOPER CONSULTANT",
    description:
      "Consulting, designing and developing web solutions using the latest technologies and best practices across a range of client engagements.",
  },
  {
    years: "2018 — 2019",
    company: "Bouvet",
    title: "DEVELOPER CONSULTANT",
    description:
      "Developing and maintaining web solutions using modern technologies and engineering best practices.",
  },
  {
    years: "2015 — 2018",
    company: "Iskilde",
    title: "MANAGER OF OPERATIONS",
    description:
      "Led operational transformation through Lean methodology — eliminating waste, building elite partnerships, and developing future capacity across the supply chain.",
  },
  {
    years: "2014 — 2015",
    company: "Schindler Elevator Corporation",
    title: "MARKET DEVELOPMENT MANAGER",
    description:
      "Built strategic partnerships and grew market presence across DC, Maryland, and Virginia — delivering tailored solutions for complex enterprise property management clients.",
  },
  {
    years: "2002 — 2014",
    company: "US Department of Defense",
    title: "VARIOUS LEADERSHIP ROLES",
    description:
      "Led multifunctional teams across multiple global deployments in high-stakes, complex operating environments.",
  },
] as const;

function TimelineContent({ entry }: { entry: (typeof EXPERIENCE)[number] }) {
  return (
    <div>
      <p
        className="font-display font-bold text-text-primary"
        style={{ fontSize: "20px", lineHeight: 1.2 }}
      >
        {entry.company}
      </p>
      <p
        className="font-body font-medium uppercase"
        style={{
          fontSize: "13px",
          color: "#FFB77D",
          letterSpacing: "0.1em",
          marginTop: "4px",
        }}
      >
        {entry.title}
      </p>
      <p
        className="font-body text-text-muted"
        style={{
          fontSize: "15px",
          lineHeight: 1.7,
          maxWidth: "520px",
          marginTop: "10px",
        }}
      >
        {entry.description}
      </p>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="relative">
      {/* Desktop vertical line */}
      <div
        className="absolute hidden md:block"
        style={{
          left: "88px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "#222220",
        }}
      />
      {/* Mobile vertical line */}
      <div
        className="absolute md:hidden"
        style={{
          left: "0",
          top: 0,
          bottom: 0,
          width: "1px",
          background: "#222220",
        }}
      />

      <div className="flex flex-col" style={{ gap: "48px" }}>
        {EXPERIENCE.map((entry) => (
          <div key={entry.company} data-anim="timeline-entry">
            {/* Desktop row: [year 80px] [dot 16px gap 16px] [content] */}
            <div
              className="hidden md:grid"
              style={{ gridTemplateColumns: "80px 32px 1fr" }}
            >
              {/* Year */}
              <div
                style={{
                  textAlign: "right",
                  paddingRight: "16px",
                  paddingTop: "2px",
                }}
              >
                {entry.years.split(" — ").map((y, j) => (
                  <span
                    key={j}
                    className="block font-display font-bold uppercase"
                    style={{
                      fontSize: "13px",
                      color: "#FFB77D",
                      letterSpacing: "0.02em",
                      lineHeight: 1.4,
                    }}
                  >
                    {y}
                  </span>
                ))}
              </div>
              {/* Dot */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "4px",
                }}
              >
                <div
                  className="circle"
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#FFB77D",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
              {/* Content */}
              <TimelineContent entry={entry} />
            </div>

            {/* Mobile row: left-border indent, year above */}
            <div className="md:hidden" style={{ paddingLeft: "24px" }}>
              <p
                className="font-display font-bold uppercase"
                style={{
                  fontSize: "13px",
                  color: "#FFB77D",
                  letterSpacing: "0.02em",
                  marginBottom: "6px",
                }}
              >
                {entry.years}
              </p>
              <TimelineContent entry={entry} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
