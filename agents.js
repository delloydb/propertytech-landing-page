document.addEventListener('DOMContentLoaded', function() {
    // Sample agent data
    const agents = [
        {
            id: 1,
            name: "Sarah Johnson",
            title: "Senior Real Estate Agent",
            specialty: "Luxury Homes",
            experience: "12 years",
            location: "Downtown",
            phone: "(555) 123-4567",
            email: "sarah@realestate.com",
            sales: "$45M+",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                facebook: "#",
                twitter: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        // Add 5-11 more agent objects following the same structure
        {
            id: 2,
            name: "Michael Chen",
            title: "Commercial Specialist",
            specialty: "Commercial",
            experience: "8 years",
            location: "Downtown",
            phone: "(555) 234-5678",
            email: "michael@realestate.com",
            sales: "$32M+",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                facebook: "#",
                twitter: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            title: "Residential Agent",
            specialty: "First-Time Buyers",
            experience: "5 years",
            location: "Suburbs",
            phone: "(555) 345-6789",
            email: "emily@realestate.com",
            sales: "$18M+",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                facebook: "#",
                twitter: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            id: 4,
            name: "David Wilson",
            title: "Investment Consultant",
            specialty: "Investment Properties",
            experience: "15 years",
            location: "Coastal",
            phone: "(555) 456-7890",
            email: "david@realestate.com",
            sales: "$68M+",
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                facebook: "#",
                twitter: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            id: 5,
            name: "Jessica Kim",
            title: "Luxury Home Specialist",
            specialty: "Luxury",
            experience: "10 years",
            location: "Downtown",
            phone: "(555) 567-8901",
            email: "jessica@realestate.com",
            sales: "$52M+",
            image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                facebook: "#",
                twitter: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            id: 6,
            name: "Robert Taylor",
            title: "Senior Agent",
            specialty: "Residential",
            experience: "20 years",
            location: "Suburbs",
            phone: "(555) 678-9012",
            email: "robert@realestate.com",
            sales: "$95M+",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                facebook: "#",
                twitter: "#",
                linkedin: "#",
                instagram: "#"
            }
        }
    ];

    // Sample testimonials
    const testimonials = [
        {
            text: "Sarah made the entire home buying process so smooth. Her knowledge of the downtown market was impressive and she negotiated a great deal for us.",
            author: "Jennifer & Mark Thompson",
            role: "Home Buyers"
        },
        {
            text: "Michael helped us find the perfect commercial space for our new business. His attention to detail and understanding of our needs was exceptional.",
            author: "Carlos Mendez",
            role: "Business Owner"
        },
        {
            text: "As first-time buyers, we were nervous about the process. Emily patiently guided us through every step and found us our dream home within our budget.",
            author: "Amanda Park",
            role: "First-Time Buyer"
        }
    ];

    // Render agents
    const agentGrid = document.getElementById('agent-grid');
    
    function renderAgents(agentsToRender) {
        agentGrid.innerHTML = '';
        
        agentsToRender.forEach(agent => {
            const card = document.createElement('div');
            card.className = 'agent-card';
            
            card.innerHTML = `
                <div class="agent-image">
                    <img src="${agent.image}" alt="${agent.name}">
                    <div class="agent-social">
                        <a href="${agent.social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a href="${agent.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="${agent.social.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                        <a href="${agent.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div class="agent-details">
                    <h3 class="agent-name">${agent.name}</h3>
                    <div class="agent-title">${agent.title}</div>
                    <div class="agent-specialty">${agent.specialty}</div>
                    <div class="agent-info">
                        <div><i class="fas fa-briefcase"></i> ${agent.experience} experience</div>
                        <div><i class="fas fa-map-marker-alt"></i> ${agent.location}</div>
                        <div><i class="fas fa-phone"></i> ${agent.phone}</div>
                        <div><i class="fas fa-envelope"></i> ${agent.email}</div>
                        <div><i class="fas fa-trophy"></i> ${agent.sales} in sales</div>
                    </div>
                    <a href="#" class="view-profile">View Profile</a>
                </div>
            `;
            
            agentGrid.appendChild(card);
        });
    }

    // Filter agents
    const experienceFilter = document.getElementById('experience-filter');
    const specialtyFilter = document.getElementById('specialty-filter');
    const locationFilter = document.getElementById('location-filter');
    const searchInput = document.querySelector('.search-bar input');
    
    function filterAgents() {
        const experience = experienceFilter.value;
        const specialty = specialtyFilter.value.toLowerCase();
        const location = locationFilter.value.toLowerCase();
        const searchTerm = searchInput.value.toLowerCase();
        
        let filtered = [...agents];
        
        if (experience) {
            filtered = filtered.filter(agent => {
                const agentExp = parseInt(agent.experience);
                return agentExp >= parseInt(experience);
            });
        }
        
        if (specialty) {
            filtered = filtered.filter(agent => 
                agent.specialty.toLowerCase().includes(specialty)
            );
        }
        
        if (location) {
            filtered = filtered.filter(agent => 
                agent.location.toLowerCase().includes(location)
            );
        }
        
        if (searchTerm) {
            filtered = filtered.filter(agent => 
                agent.name.toLowerCase().includes(searchTerm) || 
                agent.location.toLowerCase().includes(searchTerm)
            );
        }
        
        renderAgents(filtered);
    }
    
    // Add event listeners for filtering
    experienceFilter.addEventListener('change', filterAgents);
    specialtyFilter.addEventListener('change', filterAgents);
    locationFilter.addEventListener('change', filterAgents);
    searchInput.addEventListener('input', filterAgents);
    
    // Initial render
    renderAgents(agents);

    // Testimonial carousel
    let currentTestimonial = 0;
    const testimonialContainer = document.getElementById('testimonial-carousel');
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

    // Join Team CTA button
    document.querySelector('.join-team .cta-button').addEventListener('click', function() {
        // In a real implementation, this would link to a careers page or open a form
        alert('Thank you for your interest! Please email careers@realestate.com with your resume.');
    });
});