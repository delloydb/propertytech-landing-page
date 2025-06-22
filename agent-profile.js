document.addEventListener('DOMContentLoaded', function() {
    // Sample testimonials data
    const testimonials = [
        {
            text: "Sarah made the entire home buying process so smooth. Her knowledge of the downtown market was impressive and she negotiated a great deal for us.",
            author: "Jennifer & Mark Thompson",
            role: "Home Buyers"
        },
        {
            text: "We sold our condo with Sarah's help and got 15% over asking price. Her marketing strategy and negotiation skills are outstanding.",
            author: "Robert Chen",
            role: "Home Seller"
        },
        {
            text: "As first-time buyers, we were nervous about the process. Sarah patiently guided us through every step and found us our dream home within our budget.",
            author: "Amanda Park",
            role: "First-Time Buyer"
        }
    ];

    // Sample listings data
    const listings = [
        {
            id: 1,
            price: "$1,250,000",
            address: "123 Luxury Lane, Downtown",
            bedrooms: 3,
            bathrooms: 2.5,
            sqft: 2400,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        // Add 5-9 more listing objects following the same structure
        {
            id: 2,
            price: "$850,000",
            address: "456 Modern Ave, Midtown",
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1800,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            price: "$2,100,000",
            address: "789 Ocean View, Coastal",
            bedrooms: 4,
            bathrooms: 3.5,
            sqft: 3200,
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            price: "$675,000",
            address: "321 Urban Loft, Arts District",
            bedrooms: 1,
            bathrooms: 1,
            sqft: 1200,
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        }
    ];

    // Testimonial Carousel
    let currentTestimonial = 0;
    const testimonialContainer = document.getElementById('testimonials-carousel');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    function renderTestimonials() {
        testimonialContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        testimonials.forEach((testimonial, index) => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = `testimonial ${index === currentTestimonial ? 'active' : ''}`;
            testimonialElement.innerHTML = `
                <div class="testimonial-text">${testimonial.text}</div>
                <div class="testimonial-author">${testimonial.author}</div>
                <div class="testimonial-role">${testimonial.role}</div>
            `;
            testimonialContainer.appendChild(testimonialElement);
            
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === currentTestimonial ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                renderTestimonials();
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    document.querySelector('.prev-testimonial').addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        renderTestimonials();
    });
    
    document.querySelector('.next-testimonial').addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonials();
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonials();
    }, 5000);
    
    // Pause on hover
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            renderTestimonials();
        }, 5000);
    });
    
    // Initial render
    renderTestimonials();

    // Render listings
    const listingsGrid = document.getElementById('listings-grid');
    
    listings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        
        listingCard.innerHTML = `
            <div class="listing-image">
                <img src="${listing.image}" alt="Property ${listing.id}">
            </div>
            <div class="listing-details">
                <div class="listing-price">${listing.price}</div>
                <div class="listing-address">${listing.address}</div>
                <div class="listing-features">
                    <span><i class="fas fa-bed"></i> ${listing.bedrooms} beds</span>
                    <span><i class="fas fa-bath"></i> ${listing.bathrooms} baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${listing.sqft} sqft</span>
                </div>
            </div>
        `;
        
        listingCard.addEventListener('click', function() {
            // In a real app, this would link to the property details page
            window.location.href = `property-details.html?id=${listing.id}`;
        });
        
        listingsGrid.appendChild(listingCard);
    });

    // Contact form submission
    const contactForm = document.getElementById('agent-contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const interest = document.getElementById('interest').value;
        
        // In a real app, you would send this data to the server
        console.log('Contact form submitted:', {
            name,
            email,
            phone,
            message,
            interest
        });
        
        // Show success message
        alert('Thank you for your message! Sarah will contact you shortly.');
        contactForm.reset();
    });
});