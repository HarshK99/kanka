# Kanka

A modern portfolio website showcasing projects, client work, and writing. Built with modern web technologies and deployed as a static site.

## Tech Stack

- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Static hosting on Hostinger
- **CI/CD**: GitHub Actions with FTP deployment

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, pnpm, or bun

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the site

### Building for Production

```bash
npm run build
```

This generates static files in the `out/` directory, ready for deployment.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and design tokens
- `public/` - Static assets (images, favicon, etc.)

## Deployment

The site is configured for static export and automatic deployment via GitHub Actions:

- Pushes to `master` trigger a build and FTP upload to Hostinger
- Pull requests to `master` run build tests
- Static files are served directly from shared hosting

## Features

- Responsive design with modern UI components
- Client project showcase with interactive carousel
- Blog/writing section
- Contact information
- Custom H favicon
- SEO optimized with comprehensive metadata
- Optimized fonts and performance
