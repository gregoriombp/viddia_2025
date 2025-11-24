/**
 * VIDDIA - Mobile Enhancements
 * Additional JavaScript for better mobile experience
 */

(function() {
    'use strict';

    // Detect if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;

    // Add mobile class to body
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }
    if (isTablet) {
        document.body.classList.add('is-tablet');
    }

    // ==========================================
    // Smooth Scroll Enhancement
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================
    // Improve Touch Feedback
    // ==========================================
    if (isMobile) {
        // Add active state for better touch feedback
        document.querySelectorAll('.course-card, .btn, .dashboard-pill').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });

            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });

            element.addEventListener('touchcancel', function() {
                this.style.opacity = '1';
            });
        });
    }

    // ==========================================
    // Prevent Pull-to-Refresh on Mobile
    // ==========================================
    if (isMobile) {
        let touchStartY = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: false });

        document.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchY - touchStartY;

            // Prevent pull-to-refresh if at top of page
            if (window.scrollY === 0 && touchDiff > 0) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // ==========================================
    // Optimize Images Loading
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ==========================================
    // Handle Orientation Change
    // ==========================================
    let previousOrientation = window.orientation;

    window.addEventListener('orientationchange', function() {
        const currentOrientation = window.orientation;

        // Reload certain elements if needed
        if (previousOrientation !== currentOrientation) {
            // Force recalculation of layouts
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 200);
        }

        previousOrientation = currentOrientation;
    });

    // ==========================================
    // Improve Dropdown Behavior on Mobile
    // ==========================================
    if (isMobile) {
        const dropdowns = document.querySelectorAll('.dropdown-toggle');

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                // Prevent default behavior on mobile
                e.preventDefault();
                e.stopPropagation();

                const menu = this.nextElementSibling;
                if (menu && menu.classList.contains('dropdown-menu')) {
                    // Close other dropdowns
                    document.querySelectorAll('.dropdown-menu.show').forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            otherMenu.classList.remove('show');
                        }
                    });

                    // Toggle current dropdown
                    menu.classList.toggle('show');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }

    // ==========================================
    // Viewport Height Fix for Mobile Browsers
    // ==========================================
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // ==========================================
    // Improve Course Grid "Show More" on Mobile
    // ==========================================
    const showMoreButtons = document.querySelectorAll('[data-show-more-target]');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isMobile) {
                // Smooth scroll to show the expanded content
                setTimeout(() => {
                    const targetId = this.getAttribute('data-show-more-target');
                    const section = document.getElementById(targetId);
                    if (section) {
                        const extraCards = section.querySelectorAll('.course-card--extra');
                        if (extraCards.length > 0) {
                            extraCards[0].scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }
                    }
                }, 300);
            }
        });
    });

    // ==========================================
    // Performance: Debounce Resize Events
    // ==========================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });

    // ==========================================
    // Add CSS for resize animation stopper
    // ==========================================
    const style = document.createElement('style');
    style.textContent = `
        .resize-animation-stopper * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // Console Log for Debugging
    // ==========================================
    console.log('VIDDIA Mobile Enhancements loaded');
    console.log('Device:', isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop');
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);

})();
