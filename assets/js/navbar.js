// Navbar Component Loader - Professional reusable navigation
(function() {
    'use strict';

    // Load navbar HTML and inject into page
    async function loadNavbar() {
        try {
            const response = await fetch('/components/navbar.html');
            if (!response.ok) throw new Error('Navbar not found');
            
            const html = await response.text();
            
            // Insert navbar at the beginning of body
            const placeholder = document.getElementById('navbar-placeholder');
            if (placeholder) {
                placeholder.innerHTML = html;
            } else {
                document.body.insertAdjacentHTML('afterbegin', html);
            }
            
            // Initialize navbar functionality
            initNavbar();
            setActiveLink();
        } catch (error) {
            console.warn('Navbar component failed to load:', error);
        }
    }

    // Initialize navbar interactions
    function initNavbar() {
        const toggle = document.getElementById('navbarToggle');
        const nav = document.getElementById('navbarNav');
        
        if (!toggle || !nav) return;

        // Toggle mobile menu
        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#main-navbar')) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.navbar-link').forEach(link => {
            link.addEventListener('click', function() {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Highlight active page link
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.navbar-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Exact match or starts with (for Store, About, etc.)
            if (href === currentPath || 
                (href !== '/index.html' && currentPath.startsWith(href))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Load navbar when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNavbar);
    } else {
        loadNavbar();
    }
})();
