# Professional Navbar Component

## Overview
This is a centralized, reusable navigation bar component that loads consistently across all pages.

## How It Works

### Files Created:
1. **`/components/navbar.html`** - The navbar HTML template
2. **`/assets/js/navbar.js`** - Loader and functionality script
3. **CSS in `/assets/css/styles.css`** - Professional navbar styles

## Implementation Guide

### For New Pages:
Add these two elements to any HTML page:

```html
<head>
    <!-- ... other head elements ... -->
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
    <!-- Navbar placeholder -->
    <div id="navbar-placeholder"></div>
    
    <!-- Your page content here -->
    
    <!-- Before closing body tag -->
    <script src="/assets/js/navbar.js"></script>
</body>
```

### For Existing Pages:
1. **Remove** the old `<header>` tag and all its contents
2. **Add** `<div id="navbar-placeholder"></div>` at the start of `<body>`
3. **Add** `<script src="/assets/js/navbar.js"></script>` before `</body>`

## Features

✅ **Automatic Active Page Highlighting** - Current page is highlighted automatically
✅ **Mobile Responsive** - Hamburger menu on mobile/tablet, full menu on desktop
✅ **Smooth Animations** - Professional transitions and hover effects
✅ **Sticky Header** - Stays visible when scrolling
✅ **Accessibility** - ARIA labels, keyboard navigation, focus management
✅ **Click Outside to Close** - Mobile menu closes when clicking outside
✅ **Escape Key Support** - Press ESC to close mobile menu
✅ **Brand Colors** - Uses LingoLand's teal/orange color scheme

## Customization

### To Change Navigation Links:
Edit `/components/navbar.html`:
```html
<li class="navbar-item"><a href="/your-page/" class="navbar-link">Your Page</a></li>
```

### To Change Logo:
Edit `/components/navbar.html`:
```html
<img src="/assets/img/your-logo.png" alt="Your Logo" class="navbar-logo-img">
```

### To Change Colors:
Edit the CSS variables in `/assets/css/styles.css`:
- Background gradient: `.navbar-header { background: ... }`
- Active link color: `.navbar-link.active::after { background-color: ... }`

## Pages Updated
- ✅ `index.html` - Main homepage

## Pages To Update
You should update these pages following the implementation guide above:
- `/Store/index.html`
- `/About/index.html`
- `/Resources/index.html`
- `/Contact/index.html`
- Any other pages with navigation

## Benefits
1. **Single Source of Truth** - Update navbar once, changes reflect everywhere
2. **Consistent UX** - Same navigation experience across all pages
3. **Easy Maintenance** - No need to edit multiple files for simple changes
4. **Better Performance** - Navbar caches after first load
5. **Professional Look** - Modern design with smooth interactions
