document.addEventListener('DOMContentLoaded', (event) => {
    const topics = document.querySelectorAll('.topic');
    const searchInput = document.getElementById('searchInput');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const body = document.body;

    // Create a backdrop element
    const backdrop = document.createElement('div');
    backdrop.classList.add('nav-backdrop');
    body.appendChild(backdrop);

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('nav-active');
        backdrop.classList.toggle('active');
    });

    // Close menu when clicking on the backdrop
    backdrop.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('nav-active');
        backdrop.classList.remove('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('nav-active');
            backdrop.classList.remove('active');
        });
    });

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Topic expansion/collapse functionality with arrow animation
    topics.forEach(topic => {
        const title = topic.querySelector('.topic-title');
        const content = topic.querySelector('.topic-content');
        
        title.addEventListener('click', () => {
            title.classList.toggle('active');
            content.classList.toggle('active');
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        topics.forEach(topic => {
            const title = topic.querySelector('.topic-title').textContent.toLowerCase();
            const content = topic.querySelector('.topic-content').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                topic.style.display = 'block';
            } else {
                topic.style.display = 'none';
            }
        });
    });

    // Scroll to top functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Set active class on current page's nav link
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});