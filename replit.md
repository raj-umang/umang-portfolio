# Umang Raj - Software Engineer Portfolio

## Overview

This is a personal portfolio website for Umang Raj, a software engineer. The application showcases professional skills, projects, certifications, and a blog section for learnings. It's built as a full-stack application with a React frontend and Express backend, designed with a modern SaaS aesthetic inspired by Linear, Vercel, and Stripe.

The portfolio features:
- Hero section with professional introduction
- Skills showcase organized by categories (languages, frameworks, tools, practices)
- Featured and additional projects with live demos and GitHub links
- Certifications with credential information
- Blog/learnings section for technical content
- Contact form for visitor inquiries
- Dark/light theme support

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing (single-page application pattern)
- **React Query (@tanstack/react-query)** for server state management and data fetching
- **React Hook Form** with Zod validation for form handling and validation

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- Custom design system configured in `components.json` with "new-york" style
- Radix UI headless components for accessible, unstyled UI primitives
- Tailwind CSS for utility-first styling with custom theme configuration

**Design Principles**
- Modern SaaS minimalism with generous whitespace
- Typography-focused hierarchy using Inter/DM Sans fonts
- Consistent spacing primitives based on Tailwind units (4, 6, 8, 12, 16, 20, 24, 32)
- Custom color system with CSS variables for theme support
- Mobile-first responsive design with breakpoint-based layouts

**State Management Pattern**
- React Query for all server data (skills, projects, certifications, learnings, contact messages)
- Local component state for UI interactions (theme toggle, mobile menu, form inputs)
- Query keys follow RESTful API endpoint patterns (e.g., `/api/skills`)
- Infinite stale time to prevent unnecessary refetches

### Backend Architecture

**Server Framework**
- **Express.js** on Node.js for HTTP server
- Middleware for JSON parsing, URL-encoded bodies, and request logging
- Custom logging utility with formatted timestamps

**API Design**
- RESTful endpoints under `/api` namespace
- GET endpoints for data retrieval (skills, projects, certifications, learnings)
- POST endpoint for contact form submission
- JSON response format with error handling
- 500 status codes for internal errors

**Data Layer Pattern**
- Storage abstraction interface (`IStorage`) for data operations
- In-memory storage implementation with pre-populated mock data
- Typed data models using Zod schemas from shared directory
- UUID generation for unique identifiers

**Database Configuration**
- Drizzle ORM configured for PostgreSQL via Neon serverless driver
- Schema definitions in `shared/schema.ts` for type safety
- Migration support through drizzle-kit
- Database URL from environment variables

**Static File Serving**
- Production: Express serves pre-built frontend from `dist/public`
- Development: Vite dev server middleware integrated for HMR
- SPA fallback to `index.html` for client-side routing

### Build & Deployment Strategy

**Development Mode**
- Concurrent frontend (Vite) and backend (tsx) execution
- Hot module replacement for instant updates
- TypeScript type checking without emit
- Development-specific plugins (runtime error overlay, cartographer, dev banner)

**Production Build**
- Two-phase build: client (Vite) then server (esbuild)
- Client bundled to `dist/public` with optimized assets
- Server bundled to single `dist/index.cjs` file
- Selective bundling of server dependencies to reduce cold start times
- Externalization of non-critical dependencies

**Module System**
- ESM (ES Modules) throughout for modern JavaScript
- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)
- TypeScript with strict mode enabled
- Bundler module resolution for flexibility

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Headless, accessible component primitives (accordion, dialog, dropdown, popover, tabs, tooltip, etc.)
- **shadcn/ui**: Pre-built accessible components on top of Radix
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority (CVA)**: Type-safe component variants
- **cmdk**: Command palette component
- **Embla Carousel**: Carousel/slider functionality
- **Recharts**: Charting library for data visualization

### Form Management & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration layer for validation libraries
- **drizzle-zod**: Generate Zod schemas from Drizzle database schemas

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-kit**: CLI for migrations and schema management

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS** with Autoprefixer for CSS processing
- **tailwind-merge**: Utility for merging Tailwind classes
- **clsx**: Conditional className utility

### State Management & Data Fetching
- **@tanstack/react-query**: Server state management and caching

### Routing
- **Wouter**: Minimal client-side routing (~1.5KB)

### Utilities
- **date-fns**: Modern date utility library
- **nanoid**: Unique string ID generator

### Development Tools
- **TypeScript**: Static type checking
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for server
- **Vite**: Frontend build tool and dev server
- **@replit plugins**: Development experience enhancements (error modal, cartographer, dev banner)

### Fonts (External CDN)
- Google Fonts: DM Sans, Inter, Fira Code, JetBrains Mono, Geist Mono, Architects Daughter

### Design System Configuration
- Custom border radius values (sm: 3px, md: 6px, lg: 9px)
- Extensive color palette with HSL format for theme support
- Custom shadow system with multiple elevation levels
- Typography scale with custom font families
- Hover and active state utilities for interactive elements