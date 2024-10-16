document.addEventListener('DOMContentLoaded', (event) => {
    const topics = document.querySelectorAll('.topic');
    const searchInput = document.getElementById('searchInput');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Topic expansion/collapse functionality
    topics.forEach(topic => {
        const title = topic.querySelector('.topic-title');
        const content = topic.querySelector('.topic-content');
        
        title.addEventListener('click', () => {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            content.style.maxHeight = content.style.display === 'block' ? content.scrollHeight + "px" : "0";
        });
    });

    // Enhanced search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        topics.forEach(topic => {
            const title = topic.querySelector('.topic-title').textContent.toLowerCase();
            const content = topic.querySelector('.topic-content').textContent.toLowerCase();
            const isMatch = title.includes(searchTerm) || content.includes(searchTerm);
            
            topic.style.display = isMatch ? 'block' : 'none';
            
            if (isMatch) {
                highlightText(topic, searchTerm);
            }
        });
    });

    // Function to highlight matched text
    function highlightText(element, searchTerm) {
        const regex = new RegExp(searchTerm, 'gi');
        element.innerHTML = element.innerHTML.replace(regex, match => `<mark>${match}</mark>`);
    }

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

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkModeToggle.checked);
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }
});