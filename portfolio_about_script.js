document.addEventListener('DOMContentLoaded', function() {
    // Handle active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split("/").pop(); // Gets 'portfolio_about.html'

    navItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        if (itemPage === currentPage || (currentPage === '' && itemPage === 'index.html')) { // Highlight 'HOME' if on root
            item.classList.add('active');
        }

        // Keep click handling for dynamic SPAs or if you prefer this behavior
        item.addEventListener('click', function(e) {
            // If it's a simple link navigation, the browser will handle it.
            // This part is more for SPAs or preventing default and handling routing.
            // For this static site, the above href check on load is primary for 'active' state.
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Download CV button functionality (if a download button with class .download-btn is added to this page)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Example: window.location.href = 'path/to/your/cv.pdf';
            alert('CV download would start here!'); // Placeholder for actual download
            
            this.classList.add('download-clicked'); // For potential click feedback styling
            setTimeout(() => {
                this.classList.remove('download-clicked');
            }, 300);
        });
    }

    // Smooth scroll to sections if there were anchor links (not present in this HTML)
    // Example:
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });

    // Trigger animations on scroll for elements that need it
    // The CSS already handles staggered animations for most elements on load.
    // This JS based scroll animation can be used for elements appearing later or for more complex triggers.
    const animatedElements = document.querySelectorAll('.about-description, .section-title, .education-item, .skills-container, .software-container, .about-image, .footer-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The CSS animations are already set to play once they become visible (opacity:0 to opacity:1)
                // So, this JS observer might be redundant if CSS handles all initial animations.
                // However, if you want to re-trigger or have more complex logic, this is the place.
                // For now, let's assume CSS handles it well.
                // entry.target.classList.add('visible'); // Example: add a class to trigger JS based animation
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});