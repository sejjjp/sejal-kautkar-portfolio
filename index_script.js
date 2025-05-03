document.addEventListener('DOMContentLoaded', function() {
    // Handle active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        // Set active class based on current page URL
        if (item.href === window.location.href) {
            item.classList.add('active');
        }

        item.addEventListener('click', function() {
            // This click listener might be for SPAs or dynamic content loading.
            // For simple multi-page navigation, the browser handles active state via href matching.
            // If pages fully reload, this click-based active state might be reset unless managed with localStorage or similar.
            // For now, keeping it as it might be intended for future enhancements.
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Download CV button functionality (if it exists on the page)
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // In a real implementation, this would trigger the download
            // For example: window.location.href = 'path/to/your/cv.pdf';
            alert('CV download would start here!'); // Placeholder
            
            // Add a temporary animation class for feedback
            this.classList.add('download-clicked');
            setTimeout(() => {
                this.classList.remove('download-clicked');
            }, 300);
        });
    }
    
    // Animate elements as they come into view (simple version)
    function animateOnScroll() {
        const animElements = document.querySelectorAll('.profile-image, .intro'); // Add other classes if needed
        
        animElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3; // Adjust trigger point
            
            if (elementPosition < screenPosition) {
                // Check if animation has already been applied to prevent re-triggering
                if (element.style.opacity !== "1") { 
                    element.style.opacity = "1";
                    // Reset transform only if it was initially set for animation
                    if (element.style.transform.includes("translateY")) {
                         element.style.transform = "translateY(0)";
                    }
                }
            }
        });
    }
    
    // Add scroll event for animation
    window.addEventListener('scroll', animateOnScroll);
    // Trigger on load as well in case elements are already in view
    animateOnScroll(); 
    
    // Typing animation for role text
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent.trim(); // Trim to handle potential whitespace
        roleElement.textContent = ''; // Clear original text
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                roleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Adjust typing speed
            } else {
                // Optional: Add blinking cursor or other effect after typing finishes
                if (roleElement.classList.contains('role')) { // Ensure it has the class for the ::before pseudo-element
                    // The CSS handles the blinking cursor with ::before
                }
            }
        }
        
        // Start typing animation after a delay
        // Check if the role element itself needs the initial fade-in from CSS
        // If its parent .intro handles fade-in, this timeout can be relative to that
        const introElement = document.querySelector('.intro');
        let startTypingDelay = 1500; // Default delay

        if (introElement && introElement.style.animationName === 'contentFadeIn') {
            // Try to sync with the end of the intro's fade-in animation
            const animationDuration = parseFloat(getComputedStyle(introElement).animationDuration) * 1000;
            const animationDelay = parseFloat(getComputedStyle(introElement).animationDelay) * 1000;
            startTypingDelay = animationDuration + animationDelay;
        }
        
        setTimeout(typeWriter, startTypingDelay);
    }
});