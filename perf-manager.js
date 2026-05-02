/**
 * Justice First - Performance & Cache Manager
 * Handles Preloader, Service Worker, and Intelligent Caching
 */

(function() {
    // 1. Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW Registration failed', err));
        });
    }

    // 2. Global Preloader Controller
    window.hidePreloader = function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            document.body.classList.add('loaded');
        }
    };

    // 3. Automated Data Loader (Cache-First)
    window.loadJusticeData = async function(callback) {
        const DEFAULT_KEY = 'justiceFirstDataV2';
        
        // Try local storage first (instant)
        let cached = localStorage.getItem(DEFAULT_KEY);
        if (cached) {
            try {
                const data = JSON.parse(cached);
                if (callback) callback(data);
                // Hide preloader quickly if we have cached data
                setTimeout(window.hidePreloader, 400);
            } catch (e) { console.error("Cache Parse Error", e); }
        }

        // Fetch fresh data in background
        try {
            const res = await fetch('data.json?v=' + Date.now());
            if (res.ok) {
                const freshData = await res.json();
                localStorage.setItem(DEFAULT_KEY, JSON.stringify(freshData));
                
                // If we didn't have cache, or if data is very important, re-run callback
                if (!cached || JSON.stringify(freshData) !== cached) {
                    if (callback) callback(freshData);
                }
                
                // Final hidden check
                setTimeout(window.hidePreloader, 600);
            }
        } catch (e) {
            console.error("Network Fetch Error", e);
            // Ensure preloader is hidden even on error
            setTimeout(window.hidePreloader, 1000);
        }
    };

    // 4. Automated Image Optimization (Lazy Loading)
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        });
    });

    // 5. Cookie/Cache Management (Automated cleanup)
    const lastCleanup = localStorage.getItem('last_cleanup');
    const now = Date.now();
    if (!lastCleanup || (now - lastCleanup > 7 * 24 * 60 * 60 * 1000)) {
        // Clear old version keys if they exist
        ['justiceFirstData', 'justiceFirstData_v1'].forEach(k => localStorage.removeItem(k));
        localStorage.setItem('last_cleanup', now);
    }

})();
