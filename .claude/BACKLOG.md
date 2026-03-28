# BACKLOG.md — Deferred ideas and future work
# Add new items as they come up during build sessions.
# Move items to DONE when completed.
# Reference this file at the start of any build session
# to pick up where you left off.

---

## PAGES — Not yet built

- [ ] Work project page template (`work/$slug.tsx`)
      Full project case study layout — hero, challenge,
      process, outcome, metrics strip, pull quotes,
      challenge callouts, related projects

- [x] Article page template (`writing/$slug.tsx`) — DONE
      Long-form article layout — hero, table of contents,
      pull quotes, code blocks, related articles,
      interactive MDX components, mobile image fallback

- [ ] Contact page (`contact.tsx`)
      Contact form, availability note, LinkedIn link
      No email displayed publicly

- [ ] **Contact page — drawing canvas**
      Component: `~/components/contact/DrawingCanvas.tsx`
      Library: `@visx/drag` (useDrag hook — add to ~/lib/visx.ts exports)
      Interaction: freehand drawing via useDrag onDragStart/onDragMove/onDragEnd
      Each gesture → new SVG <path> appended to strokes array
      Controls: "Clear" button + undo (pop last stroke)
      Export: SVG → canvas → canvas.toDataURL('image/png') → base64 PNG
      Submission: base64 string as hidden field or JSON alongside form data
      Note: SVG must use explicit hex #131313 background rect (not CSS var)
            — CSS variables do not resolve when SVG is serialised for canvas
      Touch: built into @visx/drag via pointer events — no extra handling needed
      Revisit: when contact page (contact.tsx) is being implemented

---

## VISUALISATIONS — Deferred

- [ ] **Streamgraph — About page**
      Location: Experience or Industries section
      X axis: career years (2002–present)
      Streams: industry categories
      Story: shows how industry focus has evolved
      across 20+ years of career
      Data volume: rich — will look beautiful
      Library: @visx/shape area stack
      Revisit: when about page gets visual upgrade

- [x] **Streamgraph — Writing index** — DONE ✓
      Implemented with stackOffsetWiggle + stackOrderInsideOut,
      6-color palette (solid top 3 / patterned remainder),
      clip scan + stagger animation, tags as data metric

- [ ] **Hiker SVG animation**
      Simple stick figure hiking up a diagonal trail
      Mountain triangle background, one pine tree,
      figure with backpack, no walking stick
      Loop animation — figure walks in place,
      mountain + tree scroll behind
      Current state: partial prototype built in chat
      Potential locations: about page "Beyond the Brief"
      section, loading state (NOT 404 — built as canvas variants)

---

## CONTENT — Draft articles

- [ ] **"How AI Has Accelerated My Work"**
      File: `content/writing/how-ai-has-accelerated-my-work.mdx`
      Status: draft (not published)
      Subtitle: "Not the hype. The actual delta."
      Category: Design Technology
      Angle: specific and honest — not evangelical.
      The meta angle: used AI to build this portfolio,
      which is itself a case study in AI-accelerated
      delivery. The gap between what this site would
      have taken 2 years ago vs now is the story.

- [ ] **"The Best AI UX I've Seen"**
      File: `content/writing/the-best-ai-ux-i-have-seen.mdx`
      Status: draft (not published)
      Subtitle: "What separates AI that earns trust
      from AI that erodes it"
      Category: Data & AI
      Angle: not a listicle of tools — a framework
      for what good AI UX looks like. Connects to
      HMI expertise and mechanical keyboards philosophy.
      Thesis already written in about page copy:
      "that obsession with how things feel to use
      shapes how I think about HMI design and how
      AI should show up in the hands of real people"

- [ ] **"The Dashboard Nobody Uses"**
      File: `content/writing/the-dashboard-nobody-uses.mdx`
      Status: idea (not started)
      Subtitle: "Why expensive data products get built and ignored"
      Category: Data & AI
      Angle: the adoption failure mode — a follow-up to
      "Dashboards Are Not For Overview". Shifts from
      philosophy (what dashboards are for) to pathology
      (why they fail in practice). Org design, incentives,
      and the gap between the person who commissions a
      dashboard and the person who has to use it daily.
      Direct case study material from maritime + oil & gas work.

- [ ] **"What Good AI Handoff Looks Like"**
      File: `content/writing/what-good-ai-handoff-looks-like.mdx`
      Status: idea (not started)
      Subtitle: "The UX of giving a decision back to a human"
      Category: Data & AI
      Angle: not about models or prompting — about the
      threshold moment when AI hands control back to a person.
      How should that feel? What does the interface communicate?
      What does a bad handoff cost in high-stakes environments?
      Connects HMI expertise directly to AI product design.
      Natural companion piece to "The Best AI UX I've Seen".

- [ ] **"Data Governance Isn't an IT Problem"**
      File: `content/writing/data-governance-isnt-an-it-problem.mdx`
      Status: idea (not started)
      Subtitle: "The organisational design problem hiding inside your data strategy"
      Category: Data & AI
      Angle: most governance programmes fail because they're
      treated as taxonomy and tooling exercises. The real
      problem is ownership, incentives, and cross-functional
      accountability — which are design and leadership problems.
      Oil & gas engagement is a direct (anonymised) case study.

- [ ] **"Why Prototypes Lie"**
      File: `content/writing/why-prototypes-lie.mdx`
      Status: idea (not started)
      Subtitle: "The gap between what a prototype communicates and what gets built"
      Category: Design Technology
      Angle: prototypes are optimised for persuasion, not
      for implementation truth. They hide edge cases, content
      failures, motion costs, and technical constraints.
      Connects to the design-as-development thesis from
      "Design Is Creation With Researched Intent" — the
      prototype is where the fiction is most expensive.

- [ ] **"The Figma File Isn't the Design"**
      File: `content/writing/the-figma-file-isnt-the-design.mdx`
      Status: idea (not started)
      Subtitle: "What the design actually consists of"
      Category: Design Technology
      Angle: the full article version of the about page thesis:
      "doesn't show up on a Figma file". Decision logic,
      edge cases, motion behaviour, content rules, error states,
      handoff conventions — none of it lives in the file.
      Strong hiring signal: this is what senior design
      leadership actually thinks about.

- [ ] **"The Interpreter Role Nobody Hires For"**
      File: `content/writing/the-interpreter-role-nobody-hires-for.mdx`
      Status: idea (not started)
      Subtitle: "What happens when nobody speaks all four languages"
      Category: Product & Leadership
      Angle: engineering, design, data, and business strategy
      are four languages most orgs keep in separate rooms.
      The cost isn't missed meetings — it's translation loss
      at every handoff. This is the Design Technologist
      positioning made into a direct argument.
      Strongest piece for attracting the right hiring audience.

- [ ] **"How to Run a Technical Discovery"**
      File: `content/writing/how-to-run-a-technical-discovery.mdx`
      Status: idea (not started)
      Subtitle: "What a good discovery actually produces — and what a bad one costs"
      Category: Product & Leadership
      Angle: practical and specific. Discovery is the most
      under-specified phase in most product programmes.
      What are the deliverables? What decisions does it
      unlock? What does skipping it actually cost downstream?
      Strong consulting credibility signal — shows methodology,
      not just outcomes.

- [ ] **"The Mobile Dashboard Is the Wrong Tool"**
      File: `content/writing/the-mobile-dashboard-is-the-wrong-tool.mdx`
      Status: idea (not started)
      Subtitle: "Why responsive charts don't shorten the distance
      to action — and what does"
      Category: Data & AI
      Angle: the dashboard-as-overview failure mode is worse on
      mobile because the format compounds the problem. Small screens,
      time-constrained contexts, and action-oriented users need a
      different interface entirely — not a smaller version of the
      desktop experience.
      Core argument: on mobile, an AI-powered briefing layer
      is a shorter path to decision than any chart. "MV Haldane
      Spirit needs to be fixed by Thursday" is more actionable
      than a red urgency score at 40px wide.
      Design position: the assistant is not a replacement for
      the dashboard — it is a context-appropriate entry point
      to the same data. The question the article must answer:
      does the mobile assistant replace the charts entirely,
      or does it sit above them as a briefing layer with the
      option to drill down?
      Connections: natural follow-up to "Dashboards Are Not
      For Overview". Overlaps with "What Good AI Handoff
      Looks Like" — the trust threshold for acting on an
      AI summary without seeing the underlying data is the
      same problem.
      Interactive component potential: a mock mobile AI
      assistant briefing screen — startup summary, ranked
      action list, drill-down toggle to reveal underlying data.
      Would be the article's equivalent of VesselPriorityDashboard.

---

## DESIGN — Deferred decisions

- [ ] **Pattern header — fade transitions**
      The three-segment chaos→waves→order pattern
      on the work page header currently has hard cuts
      between segments. Fade transition version was
      designed but not implemented — hard cuts were
      tested first and kept.
      Revisit: if the hard cuts feel too abrupt after
      living with them for a while.
      Prompt is saved in chat history.

- [ ] **About page visual upgrade**
      Current about page is functional and complete.
      Future upgrade could include:
      - Streamgraph in Experience section
      - Additional images in "Beyond the Brief"
        (real photos needed: professional-01.jpg,
        personal-01.jpg, personal-02.jpg)
      - B&W → colour reveal on portrait
        (prompt written, not yet implemented)

---

## TECHNICAL — Deferred

- [ ] **Favicon update**
      Current favicon uses "SC" in Inter 900 on #131313 background
      with a 4px #FFB77D underline bar. Needs to be updated to match
      the live site font (Space Grotesk) and current brand refinement.
      Regenerate PNG icons after SVG update via realfavicongenerator.net.
      Sizes required: 32px, 180px, 192px, 512px.

- [ ] **PWA service worker**
      Offline support — not yet implemented
      manifest.json exists, icons needed
      Generate PNG icons from favicon.svg via
      realfavicongenerator.net
      Required sizes: 32px, 180px, 192px, 512px

- [ ] **Real images**
      Placeholder paths still in use:
      `/images/about/professional-01.jpg`
      `/images/about/personal-01.jpg`
      `/images/about/personal-02.jpg`
      `/images/work/maritime-intelligence.jpg`
      `/images/work/data-governance.jpg`
      `/images/work/maritime-dashboard.jpg`
      `/images/portrait/stephen-chiang.jpg` ✅ done
      `/images/content/vessel-priority-dashboard.png` — mobile fallback
        for VesselPriorityDashboard in dashboards-are-not-for-overview.mdx

- [ ] **Work project hero images**
      Each project MDX references a heroImage path
      that doesn't exist yet. Add real screenshots
      or mockups before launching project pages.

- [ ] **Motion layer audit**
      GSAP scroll triggers exist on homepage and
      about page. Verify all pages have consistent
      scroll-triggered reveal animations before
      final launch.

- [ ] **DESIGN.md sync**
      Update DESIGN.md after every significant
      build session per CLAUDE.md instructions.
      Last updated: March 2026 (article page template +
      VesselPriorityDashboard interactive MDX component)

---

## IDEAS — Not yet decided

- [ ] **Loading state**
      Simple copper spinner or the hiker
      animation for slow connections

- [ ] **Case study password protection**
      For NDA projects — ability to password
      protect individual project pages
      rather than removing them entirely

- [ ] **Console easter egg**
      Trigger:    Opening browser DevTools on any page
      Method:     console.log() call in root.tsx useEffect,
                  client-side only (typeof window guard)
      Content:    Styled ASCII-style header — "SC" monogram
                  rendered in copper (#FFB77D) using console
                  %c styling, followed by plain text:
                  "You opened the console. We should talk."
                  LinkedIn URL on the line below —
                  linkedin.com/in/chiangs
                  Final line: "Built with React Router v7,
                  GSAP, and an unreasonable attention to detail."
      Tone:       Dry, confident — not cute. Speaks directly
                  to the technical hiring manager who opened
                  DevTools to inspect the build.
      Fires:      Once per session — sessionStorage flag
                  "sc-console-shown" prevents repeat on
                  every navigation.
      Location:   root.tsx — fires globally, not per-route

- [ ] **Project depth unlock — Work rows**
      Trigger:    Hovering a work row for 3+ seconds
                  (deliberate attention, not a drive-by scroll)
      Method:     setTimeout on onMouseEnter, cleared on
                  onMouseLeave — no libraries needed
      Reveal:     A single line fades in below the project
                  title, in #737371 Manrope 400 italic 13px:
                  "What actually made this hard: [one line]"
                  Each project MDX adds a hiddenNote field
                  to frontmatter — the unlock surfaces it.
      Animation:  opacity 0 → 1, translateY 4px → 0,
                  0.3s ease — subtle, not dramatic
      Reset:      Fades out immediately on mouse leave
      Persistence: None — resets every hover. No storage.
      Tone:       Honest and specific. The note should read
                  like something you'd only say in a room
                  with the right people. Not a boast —
                  a signal that you understand where
                  complexity actually lives.
      MDX field:  hiddenNote: "Getting Snowflake and a
                  legacy .NET BFF to agree on who owned
                  the truth."  ← example
      Location:   WorkRow.tsx + project MDX frontmatter

---

## DONE

- [x] Homepage — desktop + mobile
- [x] About page — desktop + mobile
- [x] Work index page — with insights panel,
      search, filters, visualisations
- [x] Work insights animations — treemap left-to-right stagger,
      waffle diagonal wave, network graph nodes/links,
      avg MVP countdown, animationKey restart pattern,
      accent glow pulse on toggle
- [x] Writing index page — with streamgraph insights panel,
      search, filters, 3-digit ghost numbers
- [x] Writing insights animations — streamgraph re-animates
      on expand, collapse bug fixed, accent glow pulse on toggle
- [x] InsightsPanel refactor — common shell extracted to
      common/InsightsPanel.tsx (toggle, GSAP height tween,
      onMount/onExpand callbacks); WorkInsightsPanel and
      WritingInsightsPanel use render-prop pattern
- [x] WorkInsightsPanel renamed (file + component + barrel)
- [x] useCountDown hook — ~/lib/hooks.ts; replaces inline
      countdown logic in AvgMVPStat and WritingInsightsPanel
- [x] Avg read time animation — countdown on mount + re-expand
- [x] Nav order: ABOUT · WORK · WRITING · CONTACT
- [x] Easter eggs — Currently drawer,
      Style Guide drawer
- [x] Design system — DESIGN.md locked
- [x] CLAUDE.md — conventions documented
- [x] MDX content — 3 projects, 2 articles
- [x] Draft status field on content types
- [x] Favicon SVG
- [x] Deployed to Vercel at www.chiang.ink
- [x] 404 page — three rotating canvas visualisation variants:
      NetworkGraph404 (force-directed graph, RAF physics),
      Heatmap404 (48×24 grid, 4 cell states, ghost "404"),
      Treemap404 (squarified, 7 items, scaleY stagger).
      Random on load; inline "click here" cycles to a different one.
      Desktop: 12-col grid, text cols 1–7, graph cols 5–12,
      heatmap/treemap cols 7–12, no gap, 2:1 aspect ratio panel.
      Mobile: compact 200px panel between body text and CTA.
- [x] Toast system — ToastContext + ToastProvider in lib/toast.tsx,
      useToast hook, Toast component in common/Toast.tsx.
      Used for navigation hint nudges (nav count thresholds 3 and 5).
- [x] ButtonCta component — copper gradient primary CTA button,
      0px radius, used on 404 page
