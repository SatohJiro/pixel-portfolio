# ✨ Nguyen Tran Anh (SatohJiro) — Personal Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live%20Website-satohjiro.github.io-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://satohjiro.github.io/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-Sleek%20Glassmorphism-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

A modern, high-performance, and privacy-conscious personal developer portfolio website designed for **Nguyen Tran Anh (SatohJiro)** — Software Engineer & Class Valedictorian of Nong Lam University (GPA 3.6/4.0).

🌐 **Live URL**: [https://satohjiro.github.io/](https://satohjiro.github.io/)

---

## 🌟 Key Highlights & Features

- **💎 Modern Glassmorphism Design System**: Tailored light & dark themes with crisp contrast, smooth backdrop blurs, and micro-interactions.
- **🌐 Full Bilingual Support (EN / VI)**: Instant switching between English and Vietnamese across all sections, project details, and resumes.
- **📄 ATS-Standard Resume (Online & Print-Ready)**: Dedicated `/resume` route with pure bilingual data separation, print media stylesheets, and single-click PDF export.
- **💻 Interactive Developer CLI Sandbox**: Terminal simulator with built-in commands (`help`, `skills`, `projects`, `exp`, `edu`, `contact`, `theme`, `clear`).
- **🛡️ Privacy-First Telemetry by Design**: 100% GDPR/CCPA compliant — zero third-party tracking cookies, no IP logging, client-side session log with an interactive Telemetry Inspector.
- **🚀 Ultra-Fast Static Performance**: Built on Next.js 16 (App Router + Turbopack Static Export) for sub-second page loads and seamless mobile responsiveness.
- **🔍 Comprehensive SEO & Rich Snippets**: Integrated JSON-LD structured data (Schema.org `Person` & `WebSite`), dynamic XML `sitemap.xml`, `robots.txt`, and OpenGraph metadata.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Static Export) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict mode, full type-safety) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with Custom Glassmorphism Theme Tokens |
| **State & Theme** | [next-themes](https://github.com/pacocoursey/next-themes), React Context API |
| **Icons & Effects** | [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Deployment** | [GitHub Actions CI/CD](https://github.com/features/actions) → [GitHub Pages](https://pages.github.com/) |

---

## 📂 Project Architecture

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions CI/CD deployment
├── public/                     # Static assets (favicons, og-image, robots)
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 theme tokens & glass primitives
│   │   ├── layout.tsx          # Root layout with SEO metadata & providers
│   │   ├── page.tsx            # Main single-page portfolio layout
│   │   ├── resume/
│   │   │   └── page.tsx        # Standalone ATS print-optimized resume route
│   │   ├── robots.ts           # Dynamic robots.txt generator
│   │   └── sitemap.ts          # Dynamic sitemap.xml generator
│   ├── components/
│   │   ├── analytics/          # Privacy telemetry drawer & inspector
│   │   ├── glass/              # Reusable glassmorphic UI primitives (Card, Badge, Button, Modal)
│   │   ├── layout/             # Navbar, Footer, ThemeToggle, LanguageToggle
│   │   ├── resume/             # Interactive ATS resume modal
│   │   └── sections/           # Modular page sections (Hero, About, Skills, Projects, Exp, Awards, Terminal, Contact)
│   ├── config/
│   │   ├── seo.ts              # Schema.org JSON-LD generators
│   │   └── site.ts             # Site metadata & navigation definitions
│   ├── data/
│   │   └── portfolio-content.ts# Single source of truth for bilingual portfolio content
│   ├── hooks/                  # Custom React hooks (Language, Telemetry)
│   ├── lib/                    # Telemetry utilities and helper functions
│   └── types/                  # TypeScript interface definitions
├── next.config.ts              # Next.js static export & GitHub Pages config
├── tsconfig.json               # TypeScript compiler options
└── package.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SatohJiro/satohjiro.github.io.git
cd satohjiro.github.io

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

```bash
npm run build
```
The static build artifacts will be generated in the `./out` directory.

---

## 🚢 Deployment to GitHub Pages

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To deploy:
1. Push your commits to the `main` or `master` branch.
2. In your repository settings: **Settings** → **Pages** → Set **Source** to **`GitHub Actions`**.
3. GitHub Actions will automatically compile, optimize, and deploy the website to `https://satohjiro.github.io/`.

---

## 📬 Contact & Socials

- **Author**: Nguyen Tran Anh (SatohJiro)
- **Email**: [trananhq2345@gmail.com](mailto:trananhq2345@gmail.com)
- **Phone / Zalo**: (+84) 98 970 2459
- **LinkedIn**: [linkedin.com/in/satohjiro](https://www.linkedin.com/in/satohjiro/)
- **GitHub**: [github.com/SatohJiro](https://github.com/SatohJiro)
- **Website**: [https://satohjiro.github.io/](https://satohjiro.github.io/)

---

© 2026 Nguyen Tran Anh. Built with Next.js & Glassmorphism.
