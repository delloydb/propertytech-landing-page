document.addEventListener('DOMContentLoaded', function() {
    // Category filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter articles
            const filterValue = button.textContent.trim();
            
            articleCards.forEach(card => {
                const cardCategory = card.querySelector('.category-tag').textContent.trim();
                
                if (filterValue === 'All' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        articleCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('.excerpt').textContent.toLowerCase();
            const author = card.querySelector('.author').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || author.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the data to your server
                console.log('Subscribing email:', email);
                
                // Show success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = 'var(--secondary-color)';
                successMessage.style.marginTop = '15px';
                successMessage.style.fontWeight = '500';
                
                // Remove any existing messages
                const existingMessage = this.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                this.appendChild(successMessage);
                successMessage.classList.add('success-message');
                
                // Reset form
                emailInput.value = '';
                
                // Optionally, you could send this to your backend
                // fetch('/api/subscribe', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email: email })
                // })
                // .then(response => response.json())
                // .then(data => console.log('Success:', data))
                // .catch(error => console.error('Error:', error));
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to article cards on load
    setTimeout(() => {
        articleCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
    
    // Initialize all cards as invisible for the animation
    articleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});