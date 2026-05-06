# Requirements Document

## Introduction

LuminaAI is an existing AI SaaS web application built with React + Vite (client) and Node.js/Express (server). The application provides a suite of AI-powered tools including article writing, blog title generation, image generation, background removal, object removal, and resume review. It uses Clerk for authentication, TailwindCSS for styling, and React Router for navigation.

This feature covers a premium frontend UI/UX redesign that transforms the current interface into a futuristic, dark-mode-optimized, AI-native visual experience — comparable in quality to products like OpenAI, Linear, Vercel, and Perplexity — without modifying any backend logic, APIs, database structure, server-side code, routing, or existing functionality.

The redesign targets the following surfaces:
- **Public pages**: Navbar, Hero, AiTools, Testimonial, Plan, Footer (Home page)
- **App shell**: Layout, Sidebar (authenticated `/ai/*` routes)
- **Dashboard**: Stats cards, CreationItem list
- **AI tool pages**: WriteArticle, BlogTitles, GenerateImages, RemoveBackground, RemoveObject, ReviewResume, Community

---

## Glossary

- **UI_System**: The complete frontend visual layer of LuminaAI, encompassing all React components, CSS, and animation logic.
- **Navbar**: The top navigation bar rendered on the public Home page.
- **AppNav**: The top navigation bar rendered inside the authenticated `/ai` layout.
- **Sidebar**: The left-side navigation panel rendered inside the authenticated `/ai` layout.
- **Hero**: The full-viewport landing section on the Home page.
- **AiTools_Section**: The grid of AI tool cards on the Home page.
- **Testimonial_Section**: The user testimonial cards section on the Home page.
- **Plan_Section**: The pricing/plan selection section on the Home page.
- **Footer**: The bottom section of the Home page.
- **Dashboard**: The authenticated landing page at `/ai` showing user stats and recent creations.
- **CreationItem**: An expandable card component displaying a single user creation in the Dashboard.
- **Tool_Page**: Any of the authenticated AI tool pages (WriteArticle, BlogTitles, GenerateImages, RemoveBackground, RemoveObject, ReviewResume, Community).
- **Design_Token**: A named CSS custom property or Tailwind theme value representing a color, spacing, radius, shadow, or typography value.
- **Glassmorphism**: A visual style combining semi-transparent backgrounds, backdrop blur, and subtle border highlights.
- **Framer_Motion**: The animation library to be added for declarative React animations.
- **Color_Palette**: The defined set of primary, accent, background, surface, and text colors for the redesign.
- **Functional_Hook**: Any React hook (`useState`, `useEffect`, `useAuth`, `useUser`, `useClerk`, `useNavigate`, etc.) already present in a component that must remain untouched.
- **Clerk_Component**: Any component imported from `@clerk/clerk-react` (e.g., `UserButton`, `SignIn`, `PricingTable`, `Protect`) that must remain functionally intact.

---

## Requirements

### Requirement 1: Design Token System

**User Story:** As a developer, I want a centralized design token system, so that all visual values (colors, spacing, typography, radii, shadows) are consistent and maintainable across every component.

#### Acceptance Criteria

1. THE UI_System SHALL define a Color_Palette with the following named tokens: `--color-primary` (Electric Violet `#7C3AED`), `--color-accent` (Neon Blue `#3B82F6`), `--color-cyan` (Soft Cyan `#06B6D4`), `--color-bg-base` (Deep Dark `#050816`), `--color-bg-surface` (Dark Surface `#0F0F23`), `--color-bg-card` (Card Surface `#13132A`), `--color-border` (Subtle Border `rgba(255,255,255,0.08)`), `--color-text-primary` (White `#FFFFFF`), `--color-text-secondary` (Soft Gray `#94A3B8`).
2. THE UI_System SHALL define typography tokens: a primary font pairing of `Inter` (headings) and `Outfit` (body), with a type scale from `text-xs` (12px) to `text-7xl` (72px) using a 1.25 ratio.
3. THE UI_System SHALL define spacing tokens using an 8px base grid (4, 8, 12, 16, 24, 32, 48, 64, 96, 128px).
4. THE UI_System SHALL define border-radius tokens: `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-xl` (24px), `--radius-full` (9999px).
5. THE UI_System SHALL define shadow tokens: `--shadow-glow-primary` (violet glow), `--shadow-glow-accent` (blue glow), `--shadow-card` (dark elevation shadow).
6. WHEN a Design_Token value is changed in the token definition file, THE UI_System SHALL reflect that change across all components that reference the token without requiring per-component edits.

---

### Requirement 2: Framer Motion Integration

**User Story:** As a developer, I want Framer Motion installed and configured, so that smooth, performant animations can be applied declaratively across all components.

#### Acceptance Criteria

1. THE UI_System SHALL install `framer-motion` as a production dependency in `client/package.json`.
2. THE UI_System SHALL define reusable animation variants: `fadeUp` (fade in + translate Y from 24px to 0), `fadeIn` (opacity 0 → 1), `staggerContainer` (stagger children by 0.1s), `scaleIn` (scale 0.95 → 1 with opacity), and `slideInLeft` (translate X from -24px to 0).
3. WHEN a page section enters the viewport, THE UI_System SHALL trigger its entrance animation using Framer Motion's `whileInView` with `once: true` to avoid re-triggering on scroll-back.
4. THE UI_System SHALL respect the user's `prefers-reduced-motion` media query by disabling or reducing all animations when the preference is set to `reduce`.
5. IF Framer_Motion fails to load, THEN THE UI_System SHALL render all components in their final visible state without animation, preserving full functionality.

---

### Requirement 3: Navbar Redesign (Public)

**User Story:** As a visitor, I want a premium floating glass navbar, so that navigation feels modern and the CTA is visually prominent.

#### Acceptance Criteria

1. THE Navbar SHALL render as a fixed, full-width bar with a glassmorphism background: `background: rgba(5, 8, 22, 0.7)`, `backdrop-filter: blur(20px)`, and a bottom border of `1px solid rgba(255,255,255,0.08)`.
2. WHEN the user scrolls more than 20px from the top, THE Navbar SHALL increase its backdrop blur to `blur(24px)` and add a subtle box-shadow glow using a smooth CSS transition of 300ms.
3. THE Navbar SHALL display the LuminaAI logo on the left and the authentication control on the right, preserving all existing `useNavigate`, `useUser`, and `useClerk` Functional_Hooks.
4. WHEN the user is not authenticated, THE Navbar SHALL render a "Get Started" CTA button with a violet-to-blue gradient background, a glow box-shadow on hover, a scale-up transform of 1.03 on hover, and a scale-down of 0.97 on active press.
5. WHEN the user is authenticated, THE Navbar SHALL render the Clerk_Component `UserButton` with a glowing ring border on hover.
6. THE Navbar SHALL animate into view on initial page load using the `fadeIn` Framer_Motion variant with a duration of 0.5s.

---

### Requirement 4: Hero Section Redesign

**User Story:** As a visitor, I want a visually stunning hero section, so that I immediately understand LuminaAI's value and feel compelled to start creating.

#### Acceptance Criteria

1. THE Hero SHALL render a full-viewport section with a deep dark animated gradient background (`#050816` → `#0F0F23` → `#1a0533`) that cycles smoothly using a CSS keyframe animation of 8s duration.
2. THE Hero SHALL render at least two ambient radial glow orbs: one violet (`rgba(124, 58, 237, 0.15)`) positioned top-left and one blue (`rgba(59, 130, 246, 0.12)`) positioned bottom-right, both with a blur radius of 120px.
3. THE Hero SHALL render a badge element above the headline reading "✦ Next-Generation AI Platform" with a glassmorphism pill style and a subtle animated border glow.
4. THE Hero SHALL render the main headline with a minimum font size of `text-5xl` on mobile and `text-7xl` on desktop, using a gradient text effect from violet to cyan applied to the keyword phrase "AI tools".
5. THE Hero SHALL render the subheadline in `text-text-secondary` color at `text-lg` size with a maximum width of 560px, centered.
6. THE Hero SHALL render two CTA buttons: "Start Creating Now" (primary gradient, glow on hover) and "Watch Demo" (glassmorphism outline style), both with hover lift and active press animations.
7. THE Hero SHALL render a social proof row showing the user group image and "Trusted by 10,000+ creators" text, preserving the existing `assets.user_group` reference.
8. WHEN the Hero section mounts, THE Hero SHALL animate its badge, headline, subheadline, buttons, and social proof row in sequence using the `staggerContainer` and `fadeUp` Framer_Motion variants.
9. THE Hero SHALL preserve the existing `useNavigate` Functional_Hook and the `navigate('/ai')` call on the "Start Creating Now" button click.

---

### Requirement 5: AI Tools Section Redesign

**User Story:** As a visitor, I want the AI tools grid to look premium and interactive, so that each tool feels like a distinct, high-quality product offering.

#### Acceptance Criteria

1. THE AiTools_Section SHALL render a section heading "Powerful AI Tools" with gradient text styling and a centered subheading, both animated with `fadeUp` on scroll entry.
2. THE AiTools_Section SHALL render each tool card with a glassmorphism surface (`bg-card` token, `border-color` token, `backdrop-blur-sm`), `--radius-lg` border radius, and `--shadow-card` shadow.
3. WHEN a tool card is hovered, THE AiTools_Section SHALL apply a vertical lift of `-8px`, a border glow matching the tool's gradient color, and a smooth transition of 300ms.
4. THE AiTools_Section SHALL render each tool's icon inside a rounded container with the existing per-tool gradient background from `AiToolsData`, preserving the `tool.bg.from` and `tool.bg.to` values.
5. THE AiTools_Section SHALL animate the tool card grid using the `staggerContainer` variant so cards appear sequentially with a 0.08s stagger delay when the section enters the viewport.
6. THE AiTools_Section SHALL preserve the existing `onClick` handler that calls `navigate(tool.path)` when the user is authenticated, and the `useUser` Functional_Hook check.

---

### Requirement 6: Testimonial Section Redesign

**User Story:** As a visitor, I want the testimonials to feel credible and visually polished, so that social proof reinforces my decision to sign up.

#### Acceptance Criteria

1. THE Testimonial_Section SHALL render a section heading "Loved by Creators" with gradient text and a centered subheading, animated with `fadeUp` on scroll entry.
2. THE Testimonial_Section SHALL render each testimonial card with a glassmorphism surface, `--radius-lg` border radius, and a subtle top border highlight of `1px solid rgba(255,255,255,0.1)`.
3. WHEN a testimonial card is hovered, THE Testimonial_Section SHALL apply a vertical lift of `-6px` and a faint violet glow border, with a 300ms transition.
4. THE Testimonial_Section SHALL render star ratings using the existing `assets.star_icon` and `assets.star_dull_icon` assets, preserving the rating logic.
5. THE Testimonial_Section SHALL animate cards using the `staggerContainer` variant with a 0.1s stagger when the section enters the viewport.

---

### Requirement 7: Plan Section Redesign

**User Story:** As a visitor, I want the pricing section to feel premium and trustworthy, so that upgrading feels like a natural next step.

#### Acceptance Criteria

1. THE Plan_Section SHALL render a section heading "Choose Your Plan" with gradient text and a centered subheading, animated with `fadeUp` on scroll entry.
2. THE Plan_Section SHALL wrap the Clerk_Component `PricingTable` in a glassmorphism container with `--radius-xl` border radius and `--shadow-glow-primary` shadow, preserving the `ENABLE_BILLING` conditional logic and the fallback message exactly as-is.
3. THE Plan_Section SHALL render ambient background glow orbs behind the pricing container to add visual depth without obscuring the pricing content.

---

### Requirement 8: Footer Redesign

**User Story:** As a visitor, I want a polished footer that reinforces the brand, so that the page ends with a cohesive premium feel.

#### Acceptance Criteria

1. THE Footer SHALL render with a dark surface background (`--color-bg-surface`), a top border of `1px solid rgba(255,255,255,0.08)`, and a subtle top glow line.
2. THE Footer SHALL render the logo, company links, and newsletter subscription form in the same structural layout as the current implementation, preserving all existing anchor tags and the subscribe button.
3. THE Footer SHALL render the newsletter email input with a glassmorphism style: dark background, `--color-border` border, and a violet focus ring.
4. THE Footer SHALL render the subscribe button with the primary gradient and a hover glow effect.
5. THE Footer SHALL render the copyright line in `--color-text-secondary` at `text-sm`.

---

### Requirement 9: App Layout and AppNav Redesign

**User Story:** As an authenticated user, I want the app shell to feel like a premium AI product dashboard, so that every interaction inside the tool feels intentional and high-quality.

#### Acceptance Criteria

1. THE AppNav SHALL render with a dark surface background (`--color-bg-surface`), a bottom border of `1px solid rgba(255,255,255,0.08)`, and a minimum height of 56px.
2. THE AppNav SHALL render the LuminaAI logo on the left and the mobile hamburger/close toggle on the right for small screens, preserving the existing `sidebar` state and `setSidebar` Functional_Hooks.
3. THE AppNav SHALL preserve the existing `useNavigate` Functional_Hook and the `navigate('/')` call on logo click.
4. THE AppNav SHALL render the mobile menu toggle icons (`Menu`, `X` from lucide-react) in `--color-text-secondary` with a hover color of `--color-text-primary`.
5. THE Sidebar SHALL render with a dark surface background (`--color-bg-surface`), a right border of `1px solid rgba(255,255,255,0.08)`, and a width of 240px.
6. THE Sidebar SHALL render the user avatar and full name at the top, preserving the existing `user.imageUrl` and `user.fullName` references from the `useUser` Functional_Hook.
7. WHEN a navigation item is active, THE Sidebar SHALL apply a violet-to-blue gradient background to the active `NavLink`, preserving the existing `isActive` class logic.
8. WHEN a navigation item is hovered (and not active), THE Sidebar SHALL apply a subtle dark hover background of `rgba(255,255,255,0.05)` with a 200ms transition.
9. THE Sidebar SHALL render each nav item icon in the tool's associated accent color when active, and in `--color-text-secondary` when inactive.
10. THE Sidebar SHALL render the bottom user profile row with the user avatar, name, plan status (via the `Protect` Clerk_Component), and the `LogOut` icon, preserving all existing `openUserProfile` and `signOut` Functional_Hooks.
11. WHEN the Sidebar is toggled on mobile, THE Sidebar SHALL animate in/out using a smooth `translateX` transition of 300ms, preserving the existing `translate-x-0` / `-translate-x-full` logic.
12. THE Layout page SHALL render the main content area with a `--color-bg-base` background, preserving the `Outlet` component and the `SignIn` fallback for unauthenticated users.

---

### Requirement 10: Dashboard Redesign

**User Story:** As an authenticated user, I want the dashboard to display my stats and creations in a visually rich format, so that I can quickly understand my activity at a glance.

#### Acceptance Criteria

1. THE Dashboard SHALL render stat cards ("Total Creation" and "Active Plan") with a glassmorphism surface, `--radius-lg` border radius, and a gradient icon container, preserving the existing `creations.length` and `Protect` Clerk_Component logic.
2. WHEN a stat card is hovered, THE Dashboard SHALL apply a subtle border glow and a vertical lift of `-4px` with a 250ms transition.
3. THE Dashboard SHALL render the loading spinner using the existing `animate-spin` class, restyled with the primary violet color.
4. THE Dashboard SHALL render the "Recent Creations" label in `--color-text-primary` at `text-sm font-medium`.
5. THE Dashboard SHALL preserve the existing `getDashboardData` async function, `axios` call, `getToken` Functional_Hook, and `toast` error handling without modification.

---

### Requirement 11: CreationItem Redesign

**User Story:** As an authenticated user, I want each creation item to be visually distinct and easy to read, so that I can quickly scan and expand my past work.

#### Acceptance Criteria

1. THE CreationItem SHALL render with a glassmorphism surface, `--radius-md` border radius, and a `1px solid rgba(255,255,255,0.08)` border, replacing the current white background.
2. WHEN a CreationItem is hovered, THE CreationItem SHALL apply a border glow of `rgba(124, 58, 237, 0.3)` and a vertical lift of `-2px` with a 200ms transition.
3. THE CreationItem SHALL render the type badge with a gradient pill style matching the tool's Color_Palette accent, replacing the current blue badge.
4. WHEN a CreationItem is expanded, THE CreationItem SHALL animate the content area open using a smooth height transition of 300ms, preserving the existing `expanded` state toggle and the `react-markdown` renderer with the `reset-tw` class.
5. THE CreationItem SHALL preserve the existing `onClick` handler that toggles the `expanded` state.

---

### Requirement 12: AI Tool Pages Redesign

**User Story:** As an authenticated user, I want each AI tool page to have a consistent premium layout, so that using any tool feels part of a cohesive product experience.

#### Acceptance Criteria

1. THE Tool_Page SHALL render with a `--color-bg-base` background and consistent padding of 24px on all sides.
2. THE Tool_Page SHALL render a page heading with gradient text styling and a subheading in `--color-text-secondary`.
3. THE Tool_Page SHALL render all input fields (text inputs, textareas, file upload zones) with a glassmorphism style: dark background, `--color-border` border, `--radius-md` border radius, and a violet focus ring of `2px solid rgba(124, 58, 237, 0.6)`.
4. THE Tool_Page SHALL render all primary action buttons (e.g., "Generate", "Submit", "Upload") with the primary gradient, a glow on hover, and a scale-down of 0.97 on active press.
5. THE Tool_Page SHALL render output/result areas (generated text, images, reviewed content) inside a glassmorphism container with `--radius-lg` border radius.
6. THE Tool_Page SHALL preserve all existing Functional_Hooks, `axios` API calls, `getToken` calls, `toast` notifications, and state management without modification.
7. IF a Tool_Page renders a file upload input, THEN THE Tool_Page SHALL style the upload zone as a dashed-border glassmorphism drop area with a hover glow, without altering the underlying file input `onChange` handler.

---

### Requirement 13: Responsive Design

**User Story:** As a user on any device, I want the redesigned UI to be fully responsive, so that the premium experience is consistent on mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE UI_System SHALL render all public page sections (Navbar, Hero, AiTools_Section, Testimonial_Section, Plan_Section, Footer) correctly at viewport widths of 375px, 768px, 1024px, and 1440px.
2. THE UI_System SHALL render the authenticated app shell (AppNav, Sidebar, Dashboard, Tool_Page) correctly at viewport widths of 375px, 768px, 1024px, and 1440px.
3. WHEN the viewport width is below 640px, THE Sidebar SHALL be hidden by default and toggled via the AppNav hamburger button, preserving the existing `max-sm:absolute` and `max-sm:-translate-x-full` behavior.
4. WHEN the viewport width is 640px or above, THE Sidebar SHALL always be visible and the hamburger toggle SHALL be hidden, preserving the existing `sm:hidden` behavior.
5. THE Hero SHALL scale its headline font size responsively: `text-4xl` at 375px, `text-5xl` at 768px, `text-6xl` at 1024px, `text-7xl` at 1440px.
6. THE AiTools_Section tool card grid SHALL render 1 column at 375px, 2 columns at 768px, and 3 columns at 1024px and above.

---

### Requirement 14: Performance and Accessibility

**User Story:** As a user, I want the redesigned UI to load fast and be accessible, so that the premium experience does not come at the cost of usability or performance.

#### Acceptance Criteria

1. THE UI_System SHALL keep all CSS animations GPU-accelerated by using only `transform` and `opacity` properties for transitions, avoiding layout-triggering properties like `width`, `height`, or `top`.
2. THE UI_System SHALL ensure all interactive elements (buttons, links, nav items) have a visible focus ring that meets WCAG 2.1 AA contrast requirements (minimum 3:1 ratio against adjacent colors).
3. THE UI_System SHALL preserve all existing `alt` attributes on `<img>` elements and add descriptive `aria-label` attributes to icon-only buttons.
4. THE UI_System SHALL not introduce any new synchronous blocking scripts or render-blocking CSS imports beyond the existing Tailwind and Google Fonts imports.
5. WHEN Framer_Motion animations are running, THE UI_System SHALL use `will-change: transform` only on actively animating elements and remove it after animation completes, to avoid excessive GPU memory usage.
6. THE UI_System SHALL preserve the existing `reset-tw` CSS class and its `all: revert` rule used inside `CreationItem` for the `react-markdown` renderer.

---

### Requirement 15: Functional Preservation

**User Story:** As a developer, I want a strict guarantee that no existing functionality is broken by the redesign, so that users experience zero regression in features.

#### Acceptance Criteria

1. THE UI_System SHALL preserve all React Router `<Route>` definitions in `App.jsx` without modification.
2. THE UI_System SHALL preserve all Clerk authentication flows: sign-in via `openSignIn`, user profile via `openUserProfile`, sign-out via `signOut`, and the `SignIn` component fallback in Layout.
3. THE UI_System SHALL preserve all `axios` API calls, their endpoint paths, request headers, and response handling logic in Dashboard and all Tool_Pages.
4. THE UI_System SHALL preserve the `VITE_ENABLE_BILLING` environment variable check and the `PricingTable` / fallback message conditional in the Plan component.
5. THE UI_System SHALL preserve the `dummyCreationData`, `dummyPublishedCreationData`, and `AiToolsData` exports in `assets.js` without structural modification.
6. IF any redesigned component introduces a visual regression (broken layout, invisible text, missing interactive element) at any supported viewport width, THEN THE UI_System SHALL be corrected before the redesign is considered complete.
