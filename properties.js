document.addEventListener('DOMContentLoaded', function() {
    // Sample property data
    const properties = [
        {
            id: 1,
            title: "Modern Downtown Apartment",
            price: 450000,
            address: "123 Main St, Downtown, City",
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1200,
            type: "apartment",
            featured: true,
            description: "Beautiful modern apartment in the heart of downtown with great amenities and stunning city views.",
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
                {
            id: 2,
            badge: "Featured",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            price: "$350,000",
            beds: 3,
            baths: 2,
            area: 1800,
            title: "Modern Family Home",
            address: "123 Main St, Nairobi",
            link: "property-details.html?id=1",
            type: "house",
            status: "sale",
            amenities: ["parking", "garden"],
            dateAdded: "2023-06-15",
                        featured: true,
        },
        {
            id: 3,
            badge: "New",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            price: "$750,000",
            beds: 5,
            baths: 4,
            area: 3200,
            title: "Luxury Villa with Pool",
            address: "456 Hill View, Mombasa",
            link: "property-details.html?id=2",
            type: "villa",
            status: "sale",
            amenities: ["pool", "parking", "garden", "security"],
            dateAdded: "2023-06-10"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
            price: "$1,200/mo",
            beds: 2,
            baths: 1,
            area: 950,
            title: "Downtown Apartment",
            address: "789 Central Ave, Nairobi",
            link: "property-details.html?id=3",
            type: "apartment",
            status: "rent",
            amenities: ["furnished"],
            dateAdded: "2023-06-05"
        },
                {
            id: 5,
            badge: "Featured",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            price: "$350,000",
            beds: 3,
            baths: 2,
            area: 1800,
            title: "Modern Family Home",
            address: "123 Main St, Nairobi",
            link: "property-details.html?id=1",
            type: "house",
            status: "sale",
            amenities: ["parking", "garden"],
            dateAdded: "2023-06-15"
        },
        {
            id: 6,
            badge: "New",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            price: "$750,000",
            beds: 5,
            baths: 4,
            area: 3200,
            title: "Luxury Villa with Pool",
            address: "456 Hill View, Mombasa",
            link: "property-details.html?id=2",
            type: "villa",
            status: "sale",
            amenities: ["pool", "parking", "garden", "security"],
            dateAdded: "2023-06-10"
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
            price: "$1,200/mo",
            beds: 2,
            baths: 1,
            area: 950,
            title: "Downtown Apartment",
            address: "789 Central Ave, Nairobi",
            link: "property-details.html?id=3",
            type: "apartment",
            status: "rent",
            amenities: ["furnished"],
            dateAdded: "2023-06-05"
        },
                {
            id: 8,
            badge: "Featured",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            price: "$350,000",
            beds: 3,
            baths: 2,
            area: 1800,
            title: "Modern Family Home",
            address: "123 Main St, Nairobi",
            link: "property-details.html?id=1",
            type: "house",
            status: "sale",
            amenities: ["parking", "garden"],
            dateAdded: "2023-06-15"
        },
        {
            id: 9,
            badge: "New",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            price: "$750,000",
            beds: 5,
            baths: 4,
            area: 3200,
            title: "Luxury Villa with Pool",
            address: "456 Hill View, Mombasa",
            link: "property-details.html?id=2",
            type: "villa",
            status: "sale",
            amenities: ["pool", "parking", "garden", "security"],
            dateAdded: "2023-06-10"
        },
        {
            id: 10,
            image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
            price: "$1,200/mo",
            beds: 2,
            baths: 1,
            area: 950,
            title: "Downtown Apartment",
            address: "789 Central Ave, Nairobi",
            link: "property-details.html?id=3",
            type: "apartment",
            status: "rent",
            amenities: ["furnished"],
            dateAdded: "2023-06-05"
        },
        {
            id: 11,
            badge: "Featured",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
            price: "$350,000",
            beds: 3,
            baths: 2,
            area: 1800,
            title: "Modern Family Home",
            address: "123 Main St, Nairobi",
            link: "property-details.html?id=1",
            type: "house",
            status: "sale",
            amenities: ["parking", "garden"],
            dateAdded: "2023-06-15"
        },
        {
            id: 12,
            badge: "New",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            price: "$750,000",
            beds: 5,
            baths: 4,
            area: 3200,
            title: "Luxury Villa with Pool",
            address: "456 Hill View, Mombasa",
            link: "property-details.html?id=2",
            type: "villa",
            status: "sale",
            amenities: ["pool", "parking", "garden", "security"],
            dateAdded: "2023-06-10"
        },

        // Add 11 more property objects following the same structure
        // ...
    ];

    // Initialize map
    let map;
    const propertyGrid = document.getElementById('property-grid');
    const propertyMap = document.getElementById('property-map');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const filterToggle = document.querySelector('.filter-toggle');
    const advancedFilters = document.querySelector('.advanced-filters');
    const gridViewBtn = document.querySelector('.grid-view');
    const mapViewBtn = document.querySelector('.map-view');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const sortBy = document.getElementById('sort-by');

    // Display price range value
    priceRange.addEventListener('input', function() {
        priceValue.textContent = Number(priceRange.value).toLocaleString();
    });

    // Toggle filters on mobile
    filterToggle.addEventListener('click', function() {
        advancedFilters.classList.toggle('active');
    });

    // Toggle between grid and map view
    gridViewBtn.addEventListener('click', function() {
        propertyGrid.style.display = 'grid';
        propertyMap.style.display = 'none';
        gridViewBtn.classList.add('active');
        mapViewBtn.classList.remove('active');
    });

    mapViewBtn.addEventListener('click', function() {
        propertyGrid.style.display = 'none';
        propertyMap.style.display = 'block';
        mapViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        
        if (!map) {
            initMap();
        }
    });

    // Initialize and display map
    function initMap() {
        map = L.map('property-map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add markers for properties
        properties.forEach(property => {
            L.marker([51.505 + Math.random() * 0.01, -0.09 + Math.random() * 0.01])
                .addTo(map)
                .bindPopup(`<b>${property.title}</b><br>$${property.price.toLocaleString()}`);
        });
    }

    // Render property cards
    function renderProperties(propertiesToRender) {
        propertyGrid.innerHTML = '';
        
        propertiesToRender.forEach(property => {
            const card = document.createElement('div');
            card.className = 'property-card';
            
            card.innerHTML = `
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                    ${property.featured ? '<span class="property-badge">Featured</span>' : ''}
                </div>
                <div class="property-details">
                    <div class="property-price">$${property.price.toLocaleString()}</div>
                    <div class="property-address">${property.address}</div>
                    <div class="property-features">
                        <span><i class="fas fa-bed"></i> ${property.bedrooms} beds</span>
                        <span><i class="fas fa-bath"></i> ${property.bathrooms} baths</span>
                        <span><i class="fas fa-ruler-combined"></i> ${property.sqft} sqft</span>
                    </div>
                    <div class="property-description">${property.description}</div>
                    <a href="#" class="view-details">View Details</a>
                </div>
            `;
            
            propertyGrid.appendChild(card);
        });
    }

    // Filter and sort properties
    function filterAndSortProperties() {
        const location = document.getElementById('location').value;
        const price = Number(priceRange.value);
        const bedrooms = document.getElementById('bedrooms').value;
        const propertyType = document.getElementById('property-type').value;
        const sortValue = sortBy.value;
        
        let filtered = [...properties];
        
        // Apply filters
        if (location) {
            filtered = filtered.filter(p => p.type === location);
        }
        
        if (price) {
            filtered = filtered.filter(p => p.price <= price);
        }
        
        if (bedrooms) {
            filtered = filtered.filter(p => p.bedrooms >= Number(bedrooms));
        }
        
        if (propertyType) {
            filtered = filtered.filter(p => p.type === propertyType);
        }
        
        // Apply sorting
        switch(sortValue) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                // Assuming newer properties have higher IDs
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'featured':
                filtered.sort((a, b) => b.featured - a.featured);
                break;
        }
        
        renderProperties(filtered);
    }

    // Event listeners for filtering and sorting
    applyFiltersBtn.addEventListener('click', filterAndSortProperties);
    resetFiltersBtn.addEventListener('click', function() {
        document.getElementById('location').value = '';
        priceRange.value = 1000000;
        priceValue.textContent = '1,000,000';
        document.getElementById('bedrooms').value = '';
        document.getElementById('property-type').value = '';
        sortBy.value = 'featured';
        filterAndSortProperties();
    });
    
    sortBy.addEventListener('change', filterAndSortProperties);

    // Initial render
    renderProperties(properties);
});
