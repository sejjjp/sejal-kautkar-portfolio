document.addEventListener('DOMContentLoaded', function() {
    // Handle active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split("/").pop(); // Gets 'portfolio_services.html'

    navItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        if (itemPage === currentPage || (currentPage === '' && itemPage === 'index.html')) {
            item.classList.add('active');
        }

        // Click handling for active state (primarily for SPAs or specific behaviors)
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Download CV button functionality (if a .download-btn is present on this page)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('CV download would start here!'); // Placeholder for actual download
            
            this.classList.add('download-clicked'); // For click feedback styling
            setTimeout(() => {
                this.classList.remove('download-clicked');
            }, 300);
        });
    }
    
    // Service cards hover effects enhancement (already handled by CSS :hover)
    // The original JS for mouseenter/mouseleave on service cards for transform
    // is now handled directly by CSS :hover pseudo-class for simplicity and performance.
    // If more complex JS-driven interactions were needed on hover, this is where they'd go.
    /*
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Example: Add a class for JS-specific hover effects
            // this.classList.add('js-hover-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            // Example: Remove the class
            // this.classList.remove('js-hover-effect');
        });
    });
    */

    // Intersection Observer for entry animations (if CSS animations need JS trigger beyond simple load)
    // The current CSS uses animation properties that trigger on load based on delays.
    // If you prefer to trigger animations strictly when elements become visible in viewport:
    const animatedElements = document.querySelectorAll('.services-title, .services-subtitle, .service-card, .footer');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Assuming CSS animations are set up to play once opacity changes or a class is added
                // entry.target.style.opacity = '1'; // Or add a class that triggers animation
                // entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animate only once
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => {
        // If CSS animations are sufficient on load, this observe call might be redundant.
        // It's useful if you want to ensure animations only play when scrolled into view.
        // intersectionObserver.observe(el); 
    });
    // Given the current CSS has animation-delay, the IntersectionObserver setup for these elements
    // might not be strictly necessary unless you want to *guarantee* they only animate on scroll-into-view
    // rather than on a timed delay after page load. The CSS approach is simpler for this design.
});