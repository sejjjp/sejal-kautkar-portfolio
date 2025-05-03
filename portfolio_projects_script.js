document.addEventListener('DOMContentLoaded', function() {
    // Handle active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split("/").pop(); // Gets 'portfolio_projects.html'

    navItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        // Ensure 'index.html' is treated as the root if currentPage is empty
        if (itemPage === currentPage || (currentPage === '' && itemPage === 'index.html')) {
            item.classList.add('active');
        }

        // Optional: Click handling if not relying solely on page reload for active state
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            // Note: For a multi-page site, this click handling for 'active' state
            // is often redundant if the page fully reloads, as the above check on DOMContentLoaded
            // will set the correct active link. It's more useful for SPAs.
        });
    });
    
    // Animate elements as they come into view (Intersection Observer approach)
    const animatedElements = document.querySelectorAll('.portfolio-item, .portfolio-title, .footer');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 //  Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The CSS animations are already set to play based on opacity and transform.
                // This JS simply ensures the opacity/transform changes are triggered by intersection.
                // The CSS handles the actual animation part.
                // No need to add a 'visible' class if CSS animations start on 'opacity:0' -> 'opacity:1'
                // and 'transform: translateY(X)' -> 'transform: translateY(0)'.
                
                // If CSS animation is tied to a class like '.is-visible', then:
                // entry.target.classList.add('is-visible');

                observer.unobserve(entry.target); // Stop observing after it has animated in once
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        intersectionObserver.observe(element);
    });

    // Fallback for browsers that don't support IntersectionObserver (though most modern ones do)
    // or for elements that should animate immediately if already in view on load without scroll.
    // This simple version re-uses the CSS animation logic.
    function animateElementsIfVisible() {
        animatedElements.forEach(element => {
            // Check if the element has already been animated (e.g., by IntersectionObserver)
            // or if its default style is already `opacity: 1`
            if (element.style.opacity === '' || parseFloat(element.style.opacity) < 1) {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2; // Adjust trigger point
                
                if (elementPosition < screenPosition) {
                    // Let CSS handle the animation by simply making it "eligible"
                    // This part might be redundant if IntersectionObserver works and CSS animates on load.
                    // The key is that CSS defines the `opacity: 0` and `animation` properties.
                }
            }
        });
    }

    // Initial check on load
    animateElementsIfVisible();
    // Add scroll event for the fallback (less performant than IntersectionObserver)
    // window.addEventListener('scroll', animateElementsIfVisible);
    // It's generally better to rely on IntersectionObserver for scroll-triggered animations.
    // The provided JS snippet in the original HTML was simpler and could be less performant.
    // The IntersectionObserver is a more modern and efficient approach.
});