document.addEventListener('DOMContentLoaded', (event) => {
    const topics = document.querySelectorAll('.topic');
    const searchInput = document.getElementById('searchInput');
    const scrollToTopButton = document.getElementById('scrollToTop');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Function to toggle topic content
    function toggleTopicContent(title) {
        const content = title.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        content.style.maxHeight = content.style.display === 'block' ? content.scrollHeight + "px" : "0";
    }

    // Attach click event listeners to topic titles
    function attachTopicListeners() {
        document.querySelectorAll('.topic-title').forEach(title => {
            title.removeEventListener('click', () => toggleTopicContent(title));
            title.addEventListener('click', () => toggleTopicContent(title));
        });
    }

    // Initial attachment of event listeners
    attachTopicListeners();

    // Improved search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        topics.forEach(topic => {
            const title = topic.querySelector('.topic-title').textContent.toLowerCase();
            const content = topic.querySelector('.topic-content').textContent.toLowerCase();
            
            // Remove previous highlights
            topic.querySelectorAll('mark').forEach(marked => {
                marked.outerHTML = marked.innerHTML;
            });
            
            if (searchTerm) {
                const isMatch = title.includes(searchTerm) || content.includes(searchTerm);
                topic.style.display = isMatch ? 'block' : 'none';
                
                if (isMatch) {
                    highlightText(topic.querySelector('.topic-title'), searchTerm);
                    highlightText(topic.querySelector('.topic-content'), searchTerm);
                }
            } else {
                topic.style.display = 'block';
            }
        });

        // Reattach event listeners after search
        attachTopicListeners();
    });

    // Improved function to highlight matched text
    function highlightText(element, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const newNode = document.createElement('span');
                newNode.innerHTML = node.textContent.replace(regex, '<mark>$1</mark>');
                node.parentNode.replaceChild(newNode, node);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'MARK') {
                highlightText(node, searchTerm);
            }
        });
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