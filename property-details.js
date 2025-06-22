document.addEventListener('DOMContentLoaded', function() {
    // Initialize LightGallery for image gallery
    const viewGalleryBtn = document.getElementById('view-gallery');
    viewGalleryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const gallery = lightGallery(document.getElementById('thumbnail-gallery'), {
            selector: '.thumbnail',
            download: false,
            counter: false,
            getCaptionFromTitleOrAlt: false
        });
        
        gallery.openGallery(0);
    });

    // Thumbnail click handler
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image').querySelector('img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            const largeSrc = this.getAttribute('data-large');
            mainImage.src = largeSrc;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize neighborhood map
    const neighborhoodMap = L.map('neighborhood-map').setView([51.505, -0.09], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(neighborhoodMap);
    
    // Add marker for current property
    L.marker([51.505, -0.09]).addTo(neighborhoodMap)
        .bindPopup('<b>123 Main St</b><br>Modern Downtown Apartment');
    
    // Add nearby places markers
    const nearbyPlaces = [
        { name: "Downtown Mall", position: [51.507, -0.08], type: "shopping" },
        { name: "Metro Station", position: [51.503, -0.09], type: "transport" },
        { name: "Central Park", position: [51.506, -0.10], type: "park" },
        { name: "Restaurant Row", position: [51.504, -0.085], type: "restaurant" }
    ];
    
    nearbyPlaces.forEach(place => {
        const icon = L.divIcon({
            className: 'map-marker',
            html: `<i class="fas fa-${place.type === 'shopping' ? 'shopping-bag' : 
                  place.type === 'transport' ? 'subway' : 
                  place.type === 'park' ? 'tree' : 'utensils'}"></i>`,
            iconSize: [30, 30]
        });
        
        L.marker(place.position, { icon: icon }).addTo(neighborhoodMap)
            .bindPopup(place.name);
    });

    // Mortgage Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateMortgage);
    
    // Also calculate when inputs change
    const calculatorInputs = document.querySelectorAll('.calculator-inputs input');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', calculateMortgage);
    });
    
    // Initial calculation
    calculateMortgage();
    
    function calculateMortgage() {
        const homePrice = parseFloat(document.getElementById('home-price').value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        const loanTerm = parseFloat(document.getElementById('loan-term').value) || 30;
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 3.5;
        
        const loanAmount = homePrice - downPayment;
        const downPaymentPercent = (downPayment / homePrice * 100).toFixed(1);
        const monthlyRate = interestRate / 100 / 12;
        const payments = loanTerm * 12;
        
        // Calculate monthly payment
        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = loanAmount / payments;
        } else {
            const x = Math.pow(1 + monthlyRate, payments);
            monthlyPayment = (loanAmount * x * monthlyRate) / (x - 1);
        }
        
        const totalInterest = (monthlyPayment * payments) - loanAmount;
        
        // Update results
        document.getElementById('monthly-payment').textContent = '$' + monthlyPayment.toFixed(0);
        document.getElementById('loan-amount').textContent = '$' + loanAmount.toLocaleString();
        document.getElementById('down-payment-percent').textContent = downPaymentPercent + '%';
        document.getElementById('total-interest').textContent = '$' + totalInterest.toFixed(0).toLocaleString();
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! An agent will contact you shortly.');
        contactForm.reset();
    });

    // Load similar properties
    const similarListings = document.getElementById('similar-listings');
    
    // Sample similar properties data
    const similarProperties = [
        {
            id: 2,
            title: "Luxury Downtown Condo",
            price: 525000,
            address: "456 Center Ave, Downtown, City",
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1350,
            type: "condo",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "Modern Loft Apartment",
            price: 375000,
            address: "789 Industrial Rd, Arts District, City",
            bedrooms: 1,
            bathrooms: 1,
            sqft: 950,
            type: "apartment",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "Chic Urban Townhouse",
            price: 620000,
            address: "321 Urban Lane, Midtown, City",
            bedrooms: 3,
            bathrooms: 2.5,
            sqft: 1800,
            type: "townhouse",
            image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        }
    ];
    
    // Render similar properties
    similarProperties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'similar-card';
        
        card.innerHTML = `
            <div class="similar-image">
                <img src="${property.image}" alt="${property.title}">
            </div>
            <div class="similar-details">
                <div class="similar-price">$${property.price.toLocaleString()}</div>
                <div class="similar-address">${property.address}</div>
                <div class="similar-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.sqft} sqft</span>
                </div>
                <a href="property-details.html?id=${property.id}" class="view-similar">View Details</a>
            </div>
        `;
        
        similarListings.appendChild(card);
    });
});
