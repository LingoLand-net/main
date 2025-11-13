/**
 * LingoLand Tunisia SEO Helper Script
 * Ensures meta tags, alt text, and structured data are properly set
 * Part of the Tunisia National Visibility Boost campaign
 */

(function() {
    'use strict';

    // Ensure meta description includes "Tunisia" if missing
    function ensureMetaDescription() {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && metaDesc.content && !metaDesc.content.toLowerCase().includes('tunisia')) {
            console.warn('[SEO] Meta description missing "Tunisia" keyword');
        }
    }

    // Add alt text to images without it
    function ensureImageAltText() {
        const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
        images.forEach(img => {
            const filename = img.src.split('/').pop().split('?')[0];
            const grade = filename.match(/(\d+)(th|rd|st)?[-\s]?grade/i);
            
            if (grade) {
                img.alt = `LingoLand Grade ${grade[1]} English Coursebook Tunisia`;
            } else if (filename.includes('logo')) {
                img.alt = 'LingoLand English Books Tunisia Logo';
            } else if (filename.includes('bundle')) {
                img.alt = 'LingoLand Teacher Bundle Tunisia';
            } else {
                img.alt = 'LingoLand English Course Book Tunisia';
            }
        });
    }

    // Add JSON-LD structured data for store
    function addStructuredData() {
        // Check if already added
        if (document.querySelector('script[type="application/ld+json"]')) {
            return;
        }

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "LingoLand Tunisia",
            "description": "Official English coursebooks aligned with the Tunisian national curriculum",
            "url": "https://lingo-land.net/Store",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sfax",
                "addressCountry": "TN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "34.7406",
                "longitude": "10.7603"
            },
            "priceRange": "$$",
            "currenciesAccepted": "TND",
            "paymentAccepted": "Cash, Bank Transfer",
            "telephone": "+216-22-571-291",
            "email": "contact@lingo-land.net"
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // Add Organization structured data
    function addOrganizationData() {
        const orgData = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "LingoLand",
            "alternateName": "لينجولاند",
            "url": "https://lingo-land.net",
            "logo": "https://lingo-land.net/assets/img/logo.png",
            "sameAs": [
                "https://www.facebook.com/profile.php?id=100094352086577",
                "https://www.youtube.com/@LingoLandCoursebooks",
                "https://www.instagram.com/lingoland_coursebooks/"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+216-22-571-291",
                "contactType": "Customer Service",
                "areaServed": "TN",
                "availableLanguage": ["en", "fr", "ar"]
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(orgData);
        document.head.appendChild(script);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            ensureMetaDescription();
            ensureImageAltText();
            addStructuredData();
            addOrganizationData();
        });
    } else {
        ensureMetaDescription();
        ensureImageAltText();
        addStructuredData();
        addOrganizationData();
    }

    console.info('[SEO] LingoLand Tunisia SEO helper loaded');
})();
