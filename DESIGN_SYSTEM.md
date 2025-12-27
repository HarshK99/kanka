# Design System Documentation

## Overview
This design system provides a consistent set of reusable components and design tokens for building the personal website.

## Design Tokens

### Colors
- **Primary**: Zinc scale (50-950) for backgrounds and text
- **Accent**: White accents for highlights
- **Semantic**: Success, warning, error, info colors

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Sizes**: xs (0.75rem) to 7xl (4.5rem)
- **Weights**: thin (100) to black (900)
- **Line Heights**: tight (1.25) to loose (2)

### Spacing
- Scale: 0 (0) to 32 (8rem) in 0.25rem increments

### Border Radius
- none, sm (2px), md (6px), lg (8px), xl (12px), 2xl (16px), 3xl (24px), full (9999px)

### Shadows
- sm, md, lg, xl, 2xl, inner

### Transitions
- Durations: 75ms to 1000ms
- Easing: linear, in, out, inOut

## Components

### UI Components
- **Button**: Variants (primary, secondary, ghost, link), sizes (sm, md, lg, xl)
- **Card**: Container with header, content, footer
- **Container**: Responsive layout wrapper
- **Section**: Page section with padding and background options
- **Badge**: Technology tags
- **Typography**: Heading1-3, Paragraph, Lead, Muted

### Section Components
- **Hero**: Introduction section
- **About**: Personal narrative
- **Projects**: Project showcase with cards
- **Contact**: Contact information and links

## Usage

```tsx
import { Button, Container, Heading1 } from '@/components';

function MyComponent() {
  return (
    <Container>
      <Heading1>Welcome</Heading1>
      <Button variant="primary">Click me</Button>
    </Container>
  );
}
```

## Adding New Components

1. Create component in appropriate directory (`ui/` or `sections/`)
2. Export from `components/index.ts`
3. Follow naming conventions and TypeScript types
4. Use design tokens for consistency

## File Structure
```
app/
  components/
    ui/           # Basic UI components
    sections/     # Page sections
    index.ts      # Component exports
  lib/
    design-tokens.ts  # Design system tokens
    utils.ts          # Utility functions
```