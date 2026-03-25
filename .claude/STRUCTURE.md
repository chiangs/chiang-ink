chiangs-ink/
│
├── CLAUDE.md                         ← Auto-loaded by Claude Code (must stay in root)
├── .claude/
│   ├── DESIGN.md
│   ├── STRUCTURE.md                  ← This file
│   └── README.md
│
├── react-router.config.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
│
├── public/
│   └── images/
│       ├── portrait/
│       │   └── stephen-chiang.jpg
│       └── work/
│           └── *.jpg
│
├── content/
│   ├── writing/
│   │   └── *.mdx
│   └── work/
│       └── *.mdx
│
└── app/
    ├── app.css                       ← Design tokens (@theme) + base styles + component CSS
    ├── root.tsx                      ← HTML shell, fonts, CursorFollower mount
    ├── routes.ts                     ← File-based route definitions
    │
    ├── routes/
    │   ├── _layout.tsx               ← Nav + Footer + drawer state wrapper
    │   ├── home.tsx                  ← Homepage (composes home section components)
    │   ├── contact.tsx               ← Contact page
    │   ├── work/
    │   │   ├── index.tsx             ← Work index
    │   │   └── $slug.tsx             ← Project page template
    │   └── writing/
    │       ├── index.tsx             ← Writing index
    │       └── $slug.tsx             ← Article page template
    │
    ├── components/
    │   ├── index.ts                  ← Barrel: re-exports CursorFollower + layout/*
    │   ├── CursorFollower.tsx        ← RAF-driven cursor dot + ripple (desktop only)
    │   │
    │   ├── layout/
    │   │   ├── index.ts              ← Barrel re-export
    │   │   ├── Nav.tsx               ← Sticky nav: monogram + links + Stavanger time
    │   │   ├── Footer.tsx            ← Footer: easter egg + conditional style guide link
    │   │   ├── CurrentlyDrawer.tsx   ← Right-side drawer: personal snapshot
    │   │   └── StyleGuideDrawer.tsx  ← Right-side drawer: design system (easter egg)
    │   │
    │   ├── home/
    │   │   ├── index.ts              ← Barrel re-export
    │   │   ├── Hero.tsx              ← Split desktop / stacked mobile hero
    │   │   ├── WorkRows.tsx          ← Selected work list with hover effects
    │   │   ├── WritingList.tsx       ← Latest writing rows
    │   │   ├── AboutStrip.tsx        ← Bio strip with scroll animation
    │   │   └── ContactStrip.tsx      ← Contact CTA strip
    │   │
    │   ├── credentials/
    │   │   ├── index.ts              ← Barrel re-export
    │   │   ├── CredentialsBar.tsx    ← Identity + stats + status strip
    │   │   └── CredentialStatColumn.tsx ← Individual stat cell
    │   │
    │   └── icons/
    │       ├── index.ts              ← Barrel re-export
    │       └── TerminalIcon.tsx
    │
    ├── lib/
    │   ├── constants.ts              ← Shared literals: nav links, keys, timing constants
    │   ├── utils.ts                  ← Pure utilities: formatDate, etc.
    │   ├── hooks.ts                  ← Custom hooks: useScrolled, useStavTime
    │   ├── motion.ts                 ← GSAP animation functions (typed, return tweens)
    │   ├── ripple.ts                 ← Touch ripple effect for interactive rows
    │   ├── currently.ts              ← Currently drawer content data
    │   ├── styleguide.ts             ← Style guide drawer content data
    │   └── mdx.server.ts             ← MDX loader utilities (server-only)
    │
    └── types/
        └── content.ts                ← Frontmatter type definitions
