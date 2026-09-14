# DevByAmr

Personal portfolio site for **Amr HA**, a full-stack developer. Built as a fast, animated, bilingual single-page site with a bold visual identity.

## Features

- **Bilingual (EN / AR)** — full English/Arabic translation layer with automatic RTL layout mirroring, a segmented language switcher, and locale-aware typography (Arabic content renders in Cairo).
- **Scroll-spy navigation** — a floating nav bar with an animated "tubelight" indicator that tracks which section is in view, built with Framer Motion.
- **Animated sections** — blur/slide-in text reveals and scroll-triggered content reveals throughout, all built on lightweight custom hooks (no heavy animation library beyond what the nav needs).
- **Fully responsive** — tuned independently for mobile, tablet, and desktop, including breakpoint-specific type scale fixes to avoid clipping on narrow phones.
- **Sections** — Hero, About, Projects, Experience, Contact, and a linked footer, all wired to the same content/translation source.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev/build tooling
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn](https://ui.shadcn.com/) component conventions (`components.json`, `/src/components/ui`)
- [Framer Motion](https://www.framer.com/motion/) for the nav's animated indicator
- [Lucide](https://lucide.dev/) icons

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# type-check and build for production
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

## Project structure

```
src/
├── components/
│   ├── sections/       # Hero, About, Projects, Experience, Contact
│   ├── ui/             # Reusable primitives (BlurText, Reveal, buttons, ...)
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── language-toggle.tsx
├── hooks/               # useScrollSpy, etc.
├── lib/
│   ├── i18n.tsx          # translation dictionary + language context
│   └── utils.ts
└── App.tsx
```

## Customizing content

Personal details, project cards, experience entries, and social links are placeholder content ready to be swapped out:

- Copy and translations live in [`src/lib/i18n.tsx`](src/lib/i18n.tsx).
- Project, experience, and social-link data live directly in their respective section components under `src/components/sections/`.
- Brand assets (logo, profile photo) live in `public/assets/`.

## License

This project is private and not licensed for reuse.
