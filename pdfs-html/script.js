document.addEventListener('DOMContentLoaded', () => {
    const currentPageFilename = "portfolio_projects.html"; 
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        const linkFilename = link.getAttribute('href').split('/').pop();
        if (linkFilename === currentPageFilename) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});