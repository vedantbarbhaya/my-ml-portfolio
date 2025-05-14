# Frontend Setup Overview

This document outlines the current frontend setup for the ML Portfolio website, including the frameworks used, their integration, and the steps taken to configure the environment.

## Core Frameworks and Libraries

Our frontend is built upon a modern stack designed for performance, developer experience, and rich user interfaces:

1.  **Next.js (v15.3.2)**:
    *   **Purpose**: Next.js is our primary React framework. It provides a robust structure for building server-rendered and statically generated web applications. Key features we leverage include:
        *   **App Router**: For file-system based routing.
        *   **React Server Components (RSC)**: For efficient data fetching and rendering.
        *   **Built-in Optimizations**: Image optimization, code splitting, etc.
        *   **TypeScript Support**: Ensuring type safety throughout the application.

2.  **React (v19.1.0)**:
    *   **Purpose**: React is the JavaScript library used for building the user interface components. Next.js uses React under the hood to render UI elements.

3.  **Tailwind CSS (v4.1.6)**:
    *   **Purpose**: A utility-first CSS framework for rapidly styling components directly in the markup. It allows for highly customizable designs without writing custom CSS rules for every element.
    *   **Integration**: Tailwind CSS is integrated into the Next.js build process via PostCSS. Configuration is managed in `tailwind.config.js`, and global styles/Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) are in `src/styles/globals.css`.

4.  **shadcn/ui**:
    *   **Purpose**: A collection of beautifully designed, re-usable UI components that can be copied directly into our project. These components are built using Radix UI (for accessibility and behavior) and styled with Tailwind CSS.
    *   **Key Features**:
        *   **Component-based**: We add components individually as needed (e.g., buttons, cards).
        *   **Customizable**: Since the code is part of our project, we can easily modify components.
        *   **Theming**: Uses CSS variables for easy theming and dark mode support, configured in `globals.css` and `tailwind.config.js`.

5.  **TypeScript**:
    *   **Purpose**: Adds static typing to JavaScript, helping to catch errors early during development and improving code maintainability. The entire Next.js project is configured to use TypeScript.

6.  **next-themes**:
    *   **Purpose**: Facilitates theme switching, particularly for dark mode. It integrates with Tailwind's `darkMode: 'class'` strategy.

## Framework Integration and Workflow

The frameworks and libraries are integrated as follows:

*   **Next.js & React**: Next.js orchestrates the React application, handling routing, server-side logic, and the build process. React components form the building blocks of the UI.
*   **Next.js & Tailwind CSS**:
    *   `postcss.config.js` is set up with `@tailwindcss/postcss` (for Tailwind v4+) and `autoprefixer` plugins.
    *   `src/styles/globals.css` contains Tailwind's base directives and is imported into the root layout (`src/app/layout.tsx`), making Tailwind utilities available globally.
    *   `tailwind.config.js` defines the theme, content paths, and any plugins. Next.js's build process automatically processes Tailwind classes.
*   **shadcn/ui & Tailwind CSS & Next.js**:
    *   `shadcn/ui` was initialized using its CLI (`npx shadcn@latest init`).
    *   This process configured `components.json` (defining paths and preferences for `shadcn/ui`).
    *   It updated `src/styles/globals.css` with a comprehensive set of CSS variables for light and dark themes (using `oklch` color definitions) and Tailwind v4-specific dark mode setup (`@custom-variant dark`).
    *   It created `src/lib/utils.ts` with a `cn` helper function (using `clsx` and `tailwind-merge`) to intelligently combine and apply Tailwind classes to components.
    *   `tailwind.config.js` was manually updated to include theme extensions (colors, border radius, keyframes, animations) that reference these CSS variables, effectively making `shadcn/ui`'s styling system work with Tailwind.
    *   Components added via `npx shadcn@latest add [component]` are placed directly into `src/components/ui` and use these pre-configured Tailwind styles and CSS variables.
*   **Dark Mode**:
    *   `next-themes` (`ThemeProvider` in `layout.tsx`) handles theme state (`defaultTheme="dark"`).
    *   Tailwind's `darkMode: 'class'` in `tailwind.config.js` enables dark mode styling.
    *   The CSS variables in `globals.css` provide distinct values for `:root` (light theme) and `.dark` (dark theme), which are then used by Tailwind utility classes and `shadcn/ui` components.

## Rendering Flow (Next.js with App Router & `next-themes`)

The typical rendering flow for a page request is as follows:

1.  **Client Request**: The user's browser requests a page.
2.  **Server-Side Rendering (SSR) by Next.js**:
    *   Next.js identifies the route and corresponding page component (e.g., `src/app/page.tsx`) along with the root layout (`src/app/layout.tsx`).
    *   React Server Components (RSCs), if any, fetch data and render on the server.
    *   The `RootLayout` component, including the `ThemeProvider` from `next-themes`, is rendered. With `defaultTheme="dark"`, `next-themes` applies the `dark` class to the `<html>` tag during this server render.
    *   Next.js generates the initial HTML for the page, which includes the `dark` class on the `<html>` tag.
    *   This HTML, along with necessary JavaScript bundles for client-side hydration and interactivity, is sent to the browser.
3.  **Client-Side Processing**:
    *   **Initial Render**: The browser parses the received HTML and displays the static content. The page initially appears with the dark theme due to the server-rendered `dark` class.
    *   **JavaScript Execution & Hydration**:
        *   Next.js JavaScript bundles are downloaded and executed.
        *   React "hydrates" the static HTML, making the UI interactive by attaching event listeners and reconciling the client-side component tree with the server-rendered DOM.
        *   The `next-themes` library script runs. It checks for any theme preference stored in `localStorage` (e.g., if the user previously selected a different theme).
    *   **Potential Hydration Mismatch & Resolution**:
        *   If `next-themes` on the client-side determines that the theme should be different from what the server rendered (e.g., `localStorage` has 'light', or if no preference it might behave differently before applying the default), it could change the class on the `<html>` tag.
        *   This difference between the server-rendered `<html>` tag's class and the client-side state can lead to a React hydration error.
        *   To prevent this, `suppressHydrationWarning={true}` is added to the `<html>` tag in `src/app/layout.tsx`. This tells React to ignore this specific mismatch for the `<html>` tag, which is acceptable for theme-related class changes.
4.  **Full Interactivity**: The page is now fully interactive. The theme can be toggled by the user (e.g., via `ThemeToggle.tsx`), and `next-themes` will update the `<html>` class and persist the selection in `localStorage`.

## Steps Taken So Far

1.  **Initial Project Setup**:
    *   The project was initialized as a Next.js application.
    *   A shell script (`create_structure.sh`) was used to scaffold the initial directory structure and placeholder files.

2.  **Configuration Review & Correction**:
    *   Reviewed `package.json` for dependencies and scripts.
    *   Checked `next.config.js` (initially empty).
    *   Examined `tsconfig.json` for TypeScript settings and path aliases.

3.  **Tailwind CSS Streamlining**:
    *   Ensured `src/styles/globals.css` contained the essential `@tailwind` directives.
    *   Confirmed `src/styles/globals.css` was imported into `src/app/layout.tsx`.
    *   Created `postcss.config.js` with `tailwindcss` and `autoprefixer`. (Later updated for Tailwind v4).
    *   Removed the redundant `dev:css` script from `package.json` and the `public/output.css` file, relying on Next.js's integrated Tailwind processing.

4.  **Linter Error Resolution**:
    *   Populated empty component files (`Navbar.tsx`, `Footer.tsx`, `ThemeToggle.tsx`) with basic React functional component boilerplate to resolve "not a module" linter errors.

5.  **shadcn/ui Integration**:
    *   Ran `npx shadcn@latest init` to initialize `shadcn/ui`. This step:
        *   Created `components.json` to store `shadcn/ui` configuration.
        *   Created `src/lib/utils.ts` with the `cn` utility function.
        *   Significantly updated `src/styles/globals.css` with CSS variables for theming (colors, radius using `oklch`) for both light and dark modes, and added `@import "tw-animate-css";`.
        *   Installed necessary dependencies (`class-variance-authority`, `clsx`, `lucide-react`, `tailwind-merge`, `tw-animate-css`).
    *   Manually updated `tailwind.config.js`:
        *   Added `container` settings.
        *   Extended the `theme` with `colors`, `borderRadius`, `keyframes`, and `animation` sections, all referencing the CSS variables defined in `globals.css`.
        *   Ensured the `content` array in `tailwind.config.js` includes paths to `shadcn/ui` components (e.g., `'./src/components/ui/**/*.{ts,tsx}'`).

6.  **Troubleshooting and Runtime Fixes**:
    *   **Tailwind CSS v4 PostCSS Error**: Encountered an error because Tailwind CSS v4 requires a separate PostCSS plugin.
        *   **Fix**: Installed `@tailwindcss/postcss` and updated `postcss.config.js` to use `{'@tailwindcss/postcss': {}, ...}` instead of `tailwindcss: {}`.
    *   **Empty Page Component Error**: The application failed to render `/page` with an error "The default export is not a React Component".
        *   **Fix**: Added basic React functional component boilerplate to `src/app/page.tsx` to ensure it exports a valid React component.
    *   **React Hydration Error**: Encountered a hydration error where the server-rendered HTML for the `<html>` tag did not match the client-side render, typically due to `next-themes` applying theme classes.
        *   **Fix**: Added the `suppressHydrationWarning={true}` prop to the `<html>` tag in `src/app/layout.tsx` to allow this specific mismatch.

This setup provides a solid foundation for building a feature-rich, customizable, and themeable frontend for the portfolio website. 