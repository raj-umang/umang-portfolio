# Design Guidelines: Umang Raj - Software Engineer Portfolio

## Design Approach
**Reference-Based: Modern SaaS Minimalism**
Drawing inspiration from Linear, Vercel, and Stripe's clean, professional aesthetics. Focus on typography hierarchy, generous whitespace, and purposeful visual elements that emphasize content over decoration.

## Typography System
- **Headings**: Inter or DM Sans (700 weight for H1/H2, 600 for H3/H4)
  - H1: text-6xl (hero name)
  - H2: text-4xl (section headers)
  - H3: text-2xl (project/certification titles)
  - H4: text-xl (subsection headers)
- **Body**: Inter or DM Sans (400 weight, 500 for emphasis)
  - Base: text-base, line-height relaxed
  - Small: text-sm for metadata/dates
- **Code/Tech**: JetBrains Mono or Fira Code for tech stack tags

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 lg:py-32
- Component spacing: gap-8 to gap-12
- Card padding: p-6 to p-8
- Max container width: max-w-6xl
- Content blocks: max-w-prose for text-heavy sections

## Page Structure

### Hero Section (Full viewport height)
- Large profile image (professional headshot, top-right or centered with offset)
- Left-aligned content block with:
  - Name (text-6xl, font-bold)
  - Title: "Software Engineer" (text-xl, reduced opacity)
  - 2-3 sentence intro (text-lg, max-w-2xl)
  - Primary CTA buttons with blurred backgrounds: "View Projects" + "Download Resume"
- Subtle grid pattern or gradient mesh background treatment

### Skills Section
- Grid layout: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Skill cards grouped by category (Languages, Frameworks, Tools, Practices)
- Each card: icon/logo + skill name + proficiency indicator (subtle progress bar or years)
- Hover effect: subtle lift (translate-y-1)

### Projects Showcase
- Featured project (full-width card with large preview image):
  - Project screenshot/mockup (left 60%)
  - Details (right 40%): title, description, tech stack tags, live/GitHub links
- Additional projects: grid-cols-1 md:grid-cols-2 layout
  - Each card: project image, title, brief description, tech stack chips, links
  - Tags styled as rounded pills with subtle backgrounds

### Certifications Section
- Timeline-style layout or grid-cols-1 md:grid-cols-2
- Each certification card:
  - Issuing organization logo/badge
  - Certificate name (H3)
  - Issue date + expiry (if applicable)
  - Credential ID or verification link
  - Optional certificate image thumbnail

### Learnings/Blog Section
- Card-based layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Each learning card:
  - Category tag (top-left)
  - Title (H3)
  - Brief excerpt (2-3 lines)
  - Date + read time
  - "Read more" link with arrow icon

### Contact/Footer Section
- Two-column split: 
  - Left: Contact heading, brief message, email, social links (GitHub, LinkedIn, Twitter)
  - Right: Simple contact form (name, email, message) OR additional links
- Footer bar: Copyright, built with tech stack mention

## Component Library

### Cards
- Rounded borders: rounded-xl to rounded-2xl
- Subtle shadows: shadow-sm with hover:shadow-md transition
- Padding: p-6 to p-8
- Border treatment: border with very subtle border color

### Buttons
- Primary: Large click target (px-6 py-3), rounded-lg, font-medium
- Secondary: Outlined variant with border
- On images: backdrop-blur-md with semi-transparent background

### Tags/Chips
- Small, rounded-full pills (px-3 py-1, text-sm)
- Monospace font for tech stack tags
- Inline-flex with gap-2 for multiple tags

### Navigation (if multi-page)
- Sticky header: backdrop-blur with transparency
- Horizontal nav links with active state indicators
- Mobile: Hamburger menu with slide-in drawer

### Icons
Use Heroicons via CDN for consistency throughout (GitHub, LinkedIn, external link, arrow, etc.)

## Images

### Hero Image
Large professional headshot or creative portrait of Umang Raj. High-quality, well-lit photo with professional background. Positioned prominently in hero section (either right-aligned taking 40% width, or center-offset with text overlay).

### Project Images
Screenshots or mockups of each project showcasing the UI/interface. Featured project gets hero-style treatment with full-width image. Use placeholder comments for specific project screenshots.

### Certification Badges
Official logos/badges from issuing organizations (AWS, Google, Microsoft, etc.). Small icons, 48x48 to 64x64px.

### Optional Decorative Elements
Subtle abstract background shapes or gradient meshes in hero/section backgrounds for visual interest without distraction.

## Animations
Minimal and purposeful:
- Smooth scroll behavior
- Card hover lifts (translate-y-1, duration-200)
- Button hover states (subtle scale or brightness shift)
- Fade-in on scroll for sections (use Intersection Observer)
- NO complex animations, parallax, or scroll-jacking

## Accessibility
- Semantic HTML throughout (nav, main, section, article)
- Proper heading hierarchy (no skipped levels)
- Focus indicators on all interactive elements
- Alt text for all images, including project screenshots
- Sufficient contrast ratios for all text
- Keyboard navigation support