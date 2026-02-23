# Branding Guidelines (Agent Instructions)

This document defines the landing page visual standard and must be followed by any agent creating or modifying UI in this project.

## 1) Brand Intent

- Desired perception: premium, futuristic, technical, and confident.
- Visual direction: dark base with warm/cool neon highlights.
- Feel: high contrast, strong visual impact, and clear messaging.

## 2) Color System

Use these tokens as the primary reference:

- `--bg-primary: #000000` (main background)
- `--bg-elevated: #0A0A0A` (cards/containers)
- `--text-primary: #FFFFFF`
- `--text-secondary: #C7CCD6`
- `--line-subtle: rgba(255,255,255,0.18)`
- `--accent-cyan: #39D5FF`
- `--accent-violet: #8B5CF6`
- `--accent-pink: #FF4D73`
- `--accent-orange: #FF8A3D`
- `--accent-yellow: #FFD24A`

Rules:

- Hero background must remain black (`#000`).
- Avoid heavy dark overlays on top of Spline.
- Highlight gradients should combine `pink/orange/yellow` or `cyan/violet`.
- Do not use purple as the dominant color across the whole interface.

## 3) Typography

Required typography style:

- Headline/Display: expressive serif (e.g. `Playfair Display`, `Cormorant Garamond`, `Bodoni Moda`).
- UI/Body: clean sans-serif (e.g. `Manrope`, `Sora`, `Plus Jakarta Sans`).
- Avoid “default app” appearance (`Arial`, `Roboto`, `Inter` as primary identity).

Recommended scale:

- Hero title: `clamp(48px, 8vw, 110px)` with weight `600-700`.
- Section title: `clamp(30px, 4.5vw, 56px)`.
- Body: `16px-20px`.
- Nav/labels: `14px-16px`.

## 4) Layout Language

- Hero: main content anchored to the left/lower-left area.
- Keep large negative space on the right for the interactive background.
- Desktop base grid: `12 columns`.
- Text content width: `max 720px`.
- Mobile: preserve hierarchy without hiding the primary CTA.

## 5) Signature Effects

- Soft neon glow on headlines/key points (without overdoing it).
- Buttons with luminous borders and subtle outer blur.
- Dark translucent cards (`black + alpha`) with thin light borders.
- Optional subtle background texture (light noise), never competing with content.

Signature gradient example:

- `linear-gradient(90deg, #FF4D73 0%, #FF8A3D 45%, #FFD24A 100%)`

## 6) Motion & Interaction

- Prioritize short entry animations (`300-700ms`) with fade + translate.
- Button hover: increase glow/contrast without abrupt jumps.
- Spline must remain interactive in non-content areas.
- Respect `prefers-reduced-motion`.

## 7) Component Directives

Navbar:

- Small, elegant text with generous horizontal spacing.
- Right-side CTA with luminous treatment.

Hero:

- Short, memorable headline with one keyword in gradient.
- Objective subtext (1-2 sentences).
- Two CTAs: primary (solid/luminous), secondary (outline).

Buttons:

- High border radius (`9999px`).
- States: `default`, `hover`, `active`, `disabled`.
- Minimum AA contrast for text.

## 8) Do / Don’t

Do:

- Keep black as base and glow as accent.
- Use strong contrast between headline and background.
- Preserve spacing consistency across sections.

Don’t:

- Washed-out gray interface.
- Excessive blur that hurts legibility.
- Multiple button styles without a clear system.
- Mixing too many type families.

## 9) Agent Execution Checklist

Before shipping any screen, validate:

1. Is the main background black and consistent?
2. Does typography follow serif (headline) + sans (UI/body)?
3. Is the primary CTA clearly highlighted?
4. Is Spline/background still visible and interactive?
5. Is text/button contrast sufficient?
6. Is the layout solid on desktop and mobile?

## 10) Priority Rule

When there is a conflict between a local preference and visual consistency:

1. Legibility
2. Information hierarchy
3. Branding consistency
4. Visual effect
