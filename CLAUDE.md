# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for a nostalgic book landing page called "2026 Feel It Like 2016". The site features an interactive book mockup with 2016-inspired flat design aesthetics, allowing users to preview book pages and navigate to a purchase section.

## Architecture

The project uses a simple three-file structure:

- **[index.html](index.html)** - Main HTML structure with navigation, hero section with book mockup, categories popup, and buy section
- **[script.js](script.js)** - Interactive functionality for book page navigation, popup management, touch/swipe support, and keyboard controls
- **[styles.css](styles.css)** - CSS styling with 2016 flat design color palette, responsive layout, animations, and interactive elements

## Key Components

### Interactive Book Mockup
- Located in hero section with multiple pages (cover, intro, table of contents, buy prompt)
- Navigation via arrow buttons, keyboard arrows, or swipe gestures
- State management for current page with visual transitions
- Book pages use CSS transforms for 3D flip effects

### Categories Popup System
- Modal overlay triggered by explore button or navigation link
- Grid layout showcasing four content categories (Gaming, Tech, Fashion, Music)
- Closes via close button, ESC key, or clicking outside

### 2016 Design Language
- Flat design color palette using CSS custom properties
- Bold typography with Montserrat and Open Sans fonts
- Geometric shapes and animations
- Hover effects with translate transforms and box shadows

## Development

This is a client-side only project with no build process, dependencies, or server requirements. Simply open [index.html](index.html) in a web browser to run locally.

### File Structure
```
/
├── index.html    # Main HTML document
├── script.js     # Interactive functionality
└── styles.css    # Styling and animations
```

### CSS Architecture
- CSS custom properties defined in `:root` for consistent theming
- Mobile-first responsive design with single breakpoint at 900px
- Component-based class naming (hero, book-mockup, popup-overlay, etc.)
- Keyframe animations for floating elements and pulsing effects

### JavaScript Functionality
- Book page navigation with keyboard and touch support
- Popup state management with body scroll lock
- Event delegation for multiple interaction patterns
- Smooth scrolling integration between sections