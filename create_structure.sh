#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="my-ml-portfolio"

# 1. Create directory structure
mkdir -p "$ROOT_DIR"/public/images/project-screenshots
mkdir -p "$ROOT_DIR"/src/app/{about,skills,projects,publications,blog,resume,contact}
mkdir -p "$ROOT_DIR"/src/components/ui
mkdir -p "$ROOT_DIR"/src/styles
mkdir -p "$ROOT_DIR"/src/lib
mkdir -p "$ROOT_DIR"/.github/workflows

# 2. Touch public assets
touch "$ROOT_DIR"/public/favicon.ico
touch "$ROOT_DIR"/public/images/hero.jpg
# placeholder to keep the folder in Git
touch "$ROOT_DIR"/public/images/project-screenshots/.gitkeep

# 3. App router files
touch "$ROOT_DIR"/src/app/layout.tsx
touch "$ROOT_DIR"/src/app/page.tsx
touch "$ROOT_DIR"/src/app/about/page.tsx
touch "$ROOT_DIR"/src/app/skills/page.tsx
touch "$ROOT_DIR"/src/app/projects/page.tsx
touch "$ROOT_DIR"/src/app/publications/page.tsx
touch "$ROOT_DIR"/src/app/blog/page.tsx
touch "$ROOT_DIR"/src/app/resume/page.tsx
touch "$ROOT_DIR"/src/app/contact/page.tsx

# 4. Shared components
touch "$ROOT_DIR"/src/components/Navbar.tsx
touch "$ROOT_DIR"/src/components/Footer.tsx
touch "$ROOT_DIR"/src/components/Hero.tsx
touch "$ROOT_DIR"/src/components/SectionWrapper.tsx
touch "$ROOT_DIR"/src/components/ThemeToggle.tsx
# placeholder in ui dir
touch "$ROOT_DIR"/src/components/ui/.gitkeep

# 5. Styles
touch "$ROOT_DIR"/src/styles/globals.css
touch "$ROOT_DIR"/src/styles/tailwind.css

# 6. Library & fonts
touch "$ROOT_DIR"/src/lib/analytics.ts
touch "$ROOT_DIR"/src/fonts.ts

# 7. CI workflow
touch "$ROOT_DIR"/.github/workflows/ci.yml

# 8. Root config files
touch "$ROOT_DIR"/.gitignore
touch "$ROOT_DIR"/next.config.js
touch "$ROOT_DIR"/tailwind.config.js
touch "$ROOT_DIR"/postcss.config.js
touch "$ROOT_DIR"/tsconfig.json
touch "$ROOT_DIR"/package.json

echo "✅ Project skeleton created under '${ROOT_DIR}/'"