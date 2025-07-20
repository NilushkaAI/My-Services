document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark/Light mode toggle
    const modeToggleBtn = document.getElementById('mode-toggle');
    const body = document.body;
    const moonIcon = modeToggleBtn.querySelector('.fa-moon');
    const sunIcon = modeToggleBtn.querySelector('.fa-sun');

    const setTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            modeToggleBtn.setAttribute('title', 'Switch to Light Mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            modeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
            localStorage.setItem('theme', 'light');
        }
    };

    modeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light');
    }


    // 2. Show more/Show less functionality
    const descriptionElements = document.querySelectorAll('.description');
    const shortTextLimit = 100;

    descriptionElements.forEach(descElement => {
        const fullTextSpan = descElement.querySelector('.full-text');
        const shortTextSpan = descElement.querySelector('.short-text');
        const toggleButton = descElement.querySelector('.toggle-description');

        const fullText = fullTextSpan.textContent.trim();

        if (fullText.length > shortTextLimit) {
            shortTextSpan.textContent = fullText.substring(0, shortTextLimit) + '...';
            fullTextSpan.style.display = 'none';
            shortTextSpan.style.display = 'block';
            toggleButton.style.display = 'block';
            toggleButton.textContent = 'Show more';
        } else {
            shortTextSpan.style.display = 'none';
            fullTextSpan.style.display = 'block';
            toggleButton.style.display = 'none';
        }

        toggleButton.addEventListener('click', () => {
            descElement.classList.toggle('expanded');
            if (descElement.classList.contains('expanded')) {
                toggleButton.textContent = 'Show less';
                fullTextSpan.style.display = 'block';
                shortTextSpan.style.display = 'none';
            } else {
                toggleButton.textContent = 'Show more';
                fullTextSpan.style.display = 'none';
                shortTextSpan.style.display = 'block';
            }
        });
    });

    // 3. Search and Filter Functionality
    const searchInput = document.querySelector('.search-bar input');
    const categorySelect = document.querySelector('.category-dropdown select');
    const cards = document.querySelectorAll('.card');

    const filterCards = () => {
        const searchTerm = searchInput.value.toLowerCase();
        // This 'selectedCategory' will now directly match the 'cardCategory' due to HTML change
        const selectedCategory = categorySelect.value.toLowerCase(); 

        cards.forEach(card => {
            const cardTitle = card.querySelector('h2').textContent.toLowerCase();
            const cardDescription = card.querySelector('.full-text').textContent.toLowerCase();
            // This 'cardCategory' will be compared to 'selectedCategory'
            const cardCategory = card.querySelector('.category').textContent.toLowerCase(); 

            const matchesSearch = cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm);
            const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    searchInput.addEventListener('input', filterCards);
    categorySelect.addEventListener('change', filterCards);

    filterCards(); // Initial filter
});