document.addEventListener('DOMContentLoaded', (event) => {
    const topics = document.querySelectorAll('.topic');
    const searchInput = document.getElementById('searchInput');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const darkModeToggle = document.getElementById('darkModeToggle');

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

    // Set active class on current page's nav link and tab item
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    const tabItems = document.querySelectorAll('.tab-item');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    tabItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});