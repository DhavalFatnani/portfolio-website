# Portfolio Website

A responsive, engaging portfolio website built with Next.js, React, Tailwind CSS, and Magic UI patterns. Features content-driven architecture, dark/light theme support, and smooth animations.

## Features

- 🎨 **Modern UI** - Built with Magic UI patterns and Tailwind CSS
- 🌓 **Dark/Light Theme** - System preference detection with manual toggle
- ✨ **Smooth Animations** - Framer Motion animations throughout
- 📱 **Fully Responsive** - Works beautifully on all devices
- 📝 **Content-Driven** - Easy content updates via JSON/MDX files
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🔍 **SEO Optimized** - Meta tags and structured data

## Tech Stack

- **Next.js 14** - App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **next-themes** - Theme management
- **MDX** - Case studies content

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── hero/              # Hero section
│   ├── metrics/           # Metrics section
│   ├── case-studies/      # Case studies section
│   ├── skills/            # Skills section
│   ├── recruiters/        # Recruiter CTA
│   ├── contact/           # Contact components
│   ├── theme/             # Theme toggle
│   └── ui/                # UI components
├── content/               # Content files (JSON/MDX)
│   ├── hero.json
│   ├── metrics.json
│   ├── skills.json
│   ├── founders.json
│   ├── site-settings.json
│   └── case-studies/      # MDX case studies
├── lib/                   # Utilities
│   ├── theme/             # Theme system
│   ├── animations/        # Animation variants
│   └── content/           # Content loaders
└── hooks/                 # Custom React hooks
```

## Updating Content

This portfolio is **content-driven**. All text and data comes from files in the `content/` directory. See [CONTENT_UPDATE_GUIDE.md](./CONTENT_UPDATE_GUIDE.md) for detailed instructions.

**Quick Start:**
- Edit `content/hero.json` to update the hero section
- Edit `content/site-settings.json` to update site metadata and contact info
- Add case studies as `.mdx` files in `content/case-studies/`

## Development Rules

See [cursor.rules](./cursor.rules) for development guidelines:
- PascalCase for component files
- kebab-case for folders
- Magic UI components first
- Motion/animation requirements
- Theme rules
- No hardcoded copy

## Build for Production

```bash
npm run build
npm start
```

## Customization

### Theme Colors

Edit CSS variables in `app/globals.css`:
- Light theme colors are in `:root`
- Dark theme colors are in `.dark`

### Animations

Modify animation variants in `lib/animations/motion-variants.ts`

### Components

All components are in `components/` directory and can be customized as needed.

## License

MIT
