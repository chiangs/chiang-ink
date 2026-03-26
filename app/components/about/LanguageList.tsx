// LanguageList — Languages section for About page

const LANGUAGES = [
  { name: "English", proficiency: "NATIVE" },
  { name: "Norwegian", proficiency: "PROFESSIONAL" },
  { name: "Danish", proficiency: "PROFESSIONAL" },
  { name: "Mandarin Chinese", proficiency: "CONVERSATIONAL" },
] as const;

const LANG_NOTE =
  "Working across 8 countries and 4 languages has shaped how I think about communication, precision, and the assumptions we make when we share a common language.";

export function LanguageList() {
  return (
    <>
      <div>
        {LANGUAGES.map((lang, i) => (
          <div
            key={lang.name}
            data-anim="language-row"
            className="flex items-center justify-between"
            style={{
              borderBottom: "1px solid var(--color-hover-surface)",
              paddingBottom: "20px",
              marginBottom: i < LANGUAGES.length - 1 ? "20px" : 0,
            }}
          >
            <span className="font-display font-bold text-2xl text-text-primary">
              {lang.name}
            </span>
            <span
              className="font-body font-medium text-sm text-accent uppercase"
              style={{ letterSpacing: "0.15em" }}
            >
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>

      <p
        className="font-body text-sm text-text-muted mt-8"
        style={{ fontStyle: "italic", lineHeight: 1.7, maxWidth: "520px" }}
      >
        "{LANG_NOTE}"
      </p>
    </>
  );
}
