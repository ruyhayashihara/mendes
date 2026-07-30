---
name: landing-page
description: "Use when generating, scaffolding, or modifying landing pages using this project's stack (React 19, Vite 6, Tailwind CSS v4, lucide-react, motion, TypeScript). Trigger on keywords: landing page, landing, lp, página de captura, lead capture, hero section, CTA, conversion page. Use ONLY for landing page generation — not for general React development."
---

# Landing Page Generator

Generate high-conversion landing pages using the project's established stack and patterns.

## Tech Stack

- **React 19** + **TypeScript** — type-safe components
- **Vite 6** — fast builds, HMR
- **Tailwind CSS v4** — utility-first styling via `@import "tailwindcss"` + `@theme` directives
- **lucide-react** — icon library
- **motion** — Framer Motion API for animations
- **Google Gemini API** (`@google/genai`) — server-side AI features
- **Express** — optional backend for form handling

## Project Conventions

### File Structure
```
src/
  main.tsx              — entry point
  App.tsx               — root component, composes sections
  types.ts              — all TypeScript interfaces
  data.ts               — static content/data
  index.css             — Tailwind imports + @theme custom tokens
  components/           — one file per section/component
  assets/               — images imported statically for Vite bundle
    images/
```

### Styling — Tailwind CSS v4
- Use `@theme` in `index.css` for custom design tokens (colors, fonts).
- Import fonts via `@import url(...)` at the top of `index.css`.
- Use `@layer base` for global body styles.
- Import images statically so Vite bundles them: `import img from '../assets/images/foo.jpg'`.

### Dark theme convention
- Body: `bg-[#0a0a0c] text-zinc-100`
- Cards: `bg-zinc-900/40 border border-zinc-800/80`
- Primary CTA: `bg-brand-primary hover:bg-brand-secondary text-black`
- Ambient glow: `div` with `bg-brand-primary/10 rounded-full blur-[120px]`

### Animation (motion)
- Use `motion.div` with `variants` object for staggered children:
  ```tsx
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { y: 25, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } } };
  ```
- Use `whileInView` + `viewport={{ once: true }}` for scroll-triggered reveals.

### Fonts
- `--font-sans` (Inter) — body text
- `--font-display` (Space Grotesk) — headings, CTAs
- `--font-mono` (JetBrains Mono) — badges, metadata, small labels

### Component Pattern
- Each section is a `.tsx` file in `src/components/`.
- Props interface at top of file (e.g. `interface HeroProps { onOpenLeadForm: () => void }`).
- Default export.
- All sections stacked in `App.tsx` inside `<main>`.

## Standard Landing Page Sections

1. **Header** — fixed top nav with logo + CTA button
2. **Hero** — headline, subheadline, bullet trust badges, CTA button, stats bar
3. **Comparison Section** — pain vs. solution side-by-side ("antes/depois")
4. **Interactive Calculator/ROI** — shows value proposition numerically
5. **Curriculum/Course Modules** — card grid with tags, lessons, skills
6. **Gallery** — image grid with lightbox or hover effects
7. **Instructor/About** — bio, trajectory timeline, certifications
8. **Testimonials** — social proof cards with ratings
9. **FAQ** — accordion with categories
10. **Lead Capture Modal** — form with name, whatsapp, province, etc.
11. **Footer** — links, contact, social

## Lead Capture Modal Pattern

```tsx
// State in App.tsx
const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
// Pass handlers down to all children
<Hero onOpenLeadForm={() => setIsLeadModalOpen(true)} />
<LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
```

## Data Layer Pattern

- Define all `types` in `types.ts` (export interfaces).
- Define all static content in `data.ts` (export const arrays/objects).
- Components import data from `../data`.
- Never hardcode content strings inside components.

## Images

- Place images in `src/assets/images/`.
- Import statically at the top of the component: `import img from '../assets/images/foo.jpg'`.
- The type declaration is handled by Vite's default asset modules.

## When Generating a New Landing Page

1. Ask the user for the product/service name and target audience.
2. Create `types.ts` interfaces for all data shapes.
3. Create `data.ts` with all static content.
4. Create components for each section following the patterns above.
5. Compose sections in `App.tsx`.
6. Update `index.css` with any new `@theme` tokens.
7. Update `metadata.json` with the app name and description.
8. Run `npm run dev` to verify.
