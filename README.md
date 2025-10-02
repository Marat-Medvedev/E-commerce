# 🛒 Modern E-commerce MVP

A **frontend-focused e-commerce MVP** built with **Next.js 15, React 19, TypeScript, Chakra UI v3, Redux Toolkit, and TanStack Query**.  
Demonstrates **production-ready frontend patterns** focusing on **performance, accessibility, and user experience**.

**Live Demo:** [Deployed on Vercel](https://e-commerce-mvp-three.vercel.app/)  
**Tech Stack:** Next.js + React + TypeScript + Chakra UI + Redux Toolkit + TanStack Query

---

## 🎯 Why I Built This

- **Portfolio showcase**: Demonstrates modern frontend architecture in a realistic app
- **Interview readiness**: Clear technical decisions and trade-offs
- **Performance focus**: Optimized for Lighthouse scores ≥90
- **Accessibility & UX**: WCAG 2.1 AA compliance, responsive design, consistent UI system

---

## 🔧 Key Technical Decisions

### Redux Toolkit vs Zustand

Chose **Redux Toolkit** for predictable state management, DevTools integration, and scalability.  
_Alternative considered: Zustand (simpler API, less tooling for larger apps)._

### TanStack Query vs SWR/Apollo

Chose **TanStack Query** for caching, request deduplication, and offline support.  
_Alternatives: SWR (simpler for Next.js), Apollo (better for GraphQL)._

### Chakra UI vs Tailwind

Chose **Chakra UI v3** for accessible, consistent components with built-in responsive patterns.  
_Alternative: Tailwind (more flexible, but requires custom design system)._

---

## ✨ Features

### Core Flow

- 🏠 **Home Page** with featured products
- 📦 **Catalog** with filtering & sorting
- 🔍 **Product Detail** with add-to-cart
- 🛒 **Cart** with persistence (Redux + LocalStorage)
- 💳 **Checkout** with React Hook Form + Zod validation

### Technical Enhancements

- ⚡ **Performance**: SSR, image optimization, code splitting, Lighthouse ≥90
- ♿ **Accessibility**: Keyboard navigation, ARIA labels, focus management
- 📱 **Responsive Design**: Mobile-first with Chakra breakpoints
- 🌗 **Dark Mode**: Chakra ColorMode toggle with theme tokens
- 🧪 **Testing**: Jest + React Testing Library (cart updates, product rendering, checkout form validation)
- 🛠 **Code Quality**: ESLint + Prettier + Husky pre-commit checks
- 🎨 **Polish**: Unified design system, consistent UI across all pages
- 🚀 **Deployment**: Hosted on Vercel with preview branches

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── catalog/           # Product catalog page
│   ├── product/[id]/     # Dynamic product detail pages
│   └── checkout/          # Checkout flow
├── components/            # Reusable UI components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── store/                 # Redux Toolkit store
│   └── slices/           # Redux slices
└── types/                 # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/Marat-Medvedev/E-commerce.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🚀 What’s Next

- 🔍 Search with autocomplete
- ❤️ Wishlist & favorites
- 👤 User accounts (NextAuth.js)
- 💳 Stripe integration (real payments)
