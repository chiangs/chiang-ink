// app/routes/privacy.tsx
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "Privacy Policy — Stephen Chiang" },
  { name: "robots", content: "noindex, nofollow" },
];

const LAST_UPDATED = "April 2026";

export default function Privacy() {
  return (
    <main className="max-w-container mx-auto px-margin-mob md:px-margin py-section-mob md:py-section">
      <p className="text-[11px] font-body font-medium uppercase tracking-[0.15em] text-accent mb-6">
        Privacy · chiang.ink
      </p>
      <h1
        className="font-display font-bold text-text-primary mb-2"
        style={{ fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.1 }}
      >
        Privacy Policy
      </h1>
      <p className="font-body text-sm text-text-muted mb-16">
        Last updated {LAST_UPDATED}
      </p>

      <PolicySection label="Data collection">
        <PolicyBlock
          precise="This site collects anonymous aggregate analytics data including page views, referrer sources, device type, and country of origin. No personally identifiable information is recorded. No cookies are stored on your device. No cross-site tracking occurs."
          plain="I can see that people are visiting the site and roughly where they're coming from — but I cannot identify who you are, follow you across other sites, or link your visit to any personal profile. You won't see a cookie banner because there are no cookies to accept."
        />
      </PolicySection>

      <PolicySection label="Contact form">
        <PolicyBlock
          precise="When you submit the contact form, your name, email address, and message are transmitted to Resend Inc. (resend.com) for email delivery and are received by the site owner. Resend processes this data in accordance with their privacy policy and standard data retention terms. No form data is stored in a database operated by this site."
          plain="If you send me a message, I receive it by email. Resend — the service that handles delivery — briefly processes it in transit. I don't run a database of contact submissions. I won't add you to a mailing list or share your details with anyone."
        />
      </PolicySection>

      <PolicySection label="Fonts">
        <PolicyBlock
          precise="This site uses Space Grotesk and Manrope typefaces, served from local files. No requests are made to Google Fonts or any third-party font CDN."
          plain="Loading this site does not trigger any requests to Google's servers. Your visit stays between you and chiang.ink."
        />
      </PolicySection>

      <PolicySection label="Your rights">
        <PolicyBlock
          precise="Under the General Data Protection Regulation (GDPR), you have the right to request access to, correction of, or deletion of any personal data held about you. As this site retains no personal data beyond email correspondence received via the contact form, the only actionable right in most cases is the right to request deletion of a specific email thread."
          plain="If you've contacted me and want me to delete that email, just ask. I'll do it."
        />
      </PolicySection>

      <p className="font-body text-sm text-text-muted mt-16">
        Questions about this policy? Use the{" "}
        <a href="/contact" className="text-accent hover:underline">
          contact form{" "}
        </a>
        or reach out on{" "}
        <a
          href="https://linkedin.com/in/chiangs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          LinkedIn
        </a>
        .
      </p>
    </main>
  );
}

function PolicySection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <p className="text-[11px] font-body font-medium uppercase tracking-[0.15em] text-text-muted border-b border-border pb-3 mb-6">
        {label}
      </p>
      {children}
    </section>
  );
}

function PolicyBlock({ precise, plain }: { precise: string; plain: string }) {
  return (
    <div className="mb-10">
      <p className="font-body text-base text-text-muted leading-[1.75] mb-3">
        {precise}
      </p>
      <p className="text-[11px] font-body font-medium uppercase tracking-[0.15em] text-accent mb-2">
        What this means
      </p>
      <p className="font-body text-base text-text-primary leading-[1.75]">
        {plain}
      </p>
    </div>
  );
}
