document.addEventListener('DOMContentLoaded', function() {
    // Initialize maps
    const downtownMap = L.map('map-downtown').setView([51.505, -0.09], 15);
    const suburbMap = L.map('map-suburbs').setView([51.51, -0.1], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(downtownMap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(suburbMap);

    // Add markers
    L.marker([51.505, -0.09]).addTo(downtownMap)
        .bindPopup("<b>Downtown Office</b><br>123 Realtor Ave");

    L.marker([51.51, -0.1]).addTo(suburbMap)
        .bindPopup("<b>Suburban Office</b><br>456 Main Street");

    // FAQ Accordion
    const faqData = [
        {
            question: "How quickly can I expect a response to my inquiry?",
            answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly."
        },
        {
            question: "What areas do you serve?",
            answer: "We serve the entire metropolitan area including downtown, suburbs, and surrounding communities. Our agents specialize in specific neighborhoods to provide expert local knowledge."
        },
        {
            question: "Do you charge fees for buyer representation?",
            answer: "No, our buyer representation services are typically free to home buyers. We're compensated through the seller's brokerage in most transactions."
        },
        {
            question: "How do I schedule a property viewing?",
            answer: "You can schedule viewings through our website, by calling our office, or by contacting an agent directly. Our online scheduling system allows you to book available time slots 24/7."
        },
        {
            question: "What sets your agency apart from others?",
            answer: "Our combination of local expertise, innovative marketing strategies, and personalized service delivers exceptional results. We also offer unique guarantees like our 100% satisfaction promise."
        }
    ];

    const faqAccordion = document.getElementById('faq-accordion');
    
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <div class="faq-question">${item.question}</div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            question.classList.toggle('active');
            answer.classList.toggle('show');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-item .faq-question').forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });
        });
        
        faqAccordion.appendChild(faqItem);
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real app, you would send this data to your server
        console.log('Contact form submitted:', {
            name,
            email,
            subject,
            message
        });
        
        // Show success message
        alert('Thank you for your message! We will respond to your inquiry shortly.');
        contactForm.reset();
    });

    // Social media links (would normally link to actual social media)
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would link to our ' + this.querySelector('span').textContent + ' page in a live site.');
        });
    });
});