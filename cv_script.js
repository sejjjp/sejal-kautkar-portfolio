document.addEventListener('DOMContentLoaded', function () {
    // Handle active navigation item
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.href;

    navItems.forEach(item => {
        if (item.href === currentPage) {
            item.classList.add('active');
        }
    });

    // Download CV button functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action (which would open the PDF)

            const fileUrl = 'pdfs/sejal-kautkar-resume.pdf';
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = 'sejal-kautkar-resume.pdf'; // Suggests a filename for download
            document.body.appendChild(link); // Append to body to make it clickable
            link.click(); // Programmatically click the link
            document.body.removeChild(link); // Clean up the element

            // Add a temporary animation class for feedback
            this.classList.add('download-clicked');
            setTimeout(() => {
                this.classList.remove('download-clicked');
            }, 400);
        });
    }

    // Animate elements as they come into view
    function animateOnScroll() {
        // Now targeting the new .section elements as well
        const animElements = document.querySelectorAll('.section, .resume-header');

        animElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                // Check if animation has already been applied
                if (element.style.opacity !== "1") {
                    // Re-using the contentFadeIn animation by applying a class or direct styles
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }
            }
        });
    }

    // Add scroll event for animation and trigger on load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on load for elements already in view

    // Typing animation for role text
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent.trim();
        roleElement.textContent = ''; // Clear original text

        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                roleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Typing speed
            } else {
                // Make cursor visible and blinking after typing finishes
                // roleElement.style.borderRight = '2px solid #ff7a00';
                // roleElement.classList.add('typing-done'); // You can use this class for the blinking cursor
            }
        }

        // Start typing animation after a delay (e.g., after the header fades in)
        setTimeout(typeWriter, 1200);
    }
});