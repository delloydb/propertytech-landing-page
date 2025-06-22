document.addEventListener('DOMContentLoaded', function() {
    // Timeline data
    const timelineData = [
        {
            year: "2005",
            title: "Company Founded",
            description: "Our company was established with just three agents and a shared vision for client-focused real estate services."
        },
        {
            year: "2010",
            title: "First Office Opened",
            description: "We opened our first physical office in downtown, marking our commitment to the local community."
        },
        {
            year: "2014",
            title: "Reached $100M in Sales",
            description: "Our team celebrated a major milestone of $100 million in total property sales."
        },
        {
            year: "2018",
            title: "Expanded to New Markets",
            description: "We expanded our services to cover the entire metropolitan area with three new offices."
        },
        {
            year: "2022",
            title: "Best Real Estate Agency Award",
            description: "Recognized as the top real estate agency in the region by the Real Estate Excellence Awards."
        }
    ];

    // Team data
    const teamData = [
        {
            name: "Michael Johnson",
            title: "Founder & CEO",
            bio: "With over 25 years in real estate, Michael founded our company on principles of integrity and exceptional service.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                facebook: "#"
            }
        },
        {
            name: "Sarah Williams",
            title: "Chief Operating Officer",
            bio: "Sarah oversees our daily operations and ensures every client receives the highest level of service.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                facebook: "#"
            }
        },
        {
            name: "David Chen",
            title: "Director of Sales",
            bio: "David leads our sales team with innovative strategies that consistently deliver outstanding results.",
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                facebook: "#"
            }
        },
        {
            name: "Emily Rodriguez",
            title: "Marketing Director",
            bio: "Emily's creative marketing campaigns showcase our listings to the right buyers at the right time.",
            image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                facebook: "#"
            }
        }
    ];

    // Testimonials data
    const testimonialsData = [
        {
            text: "Working with this team was the best decision we made in our home buying journey. Their knowledge and patience made all the difference.",
            author: "Jennifer & Mark Thompson",
            role: "Home Buyers"
        },
        {
            text: "They sold our property for 15% over asking price in just 10 days. Their marketing strategy is unmatched in the industry.",
            author: "Robert Chen",
            role: "Home Seller"
        },
        {
            text: "As first-time investors, we needed guidance. They educated us and helped find properties that matched our goals perfectly.",
            author: "Amanda Park",
            role: "Real Estate Investor"
        }
    ];

    // Render timeline
    const timeline = document.getElementById('timeline');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });

    // Render team
    const teamGrid = document.getElementById('team-grid');
    
    teamData.forEach(member => {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        
        teamMember.innerHTML = `
            <div class="team-photo">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="team-details">
                <h3 class="team-name">${member.name}</h3>
                <div class="team-title">${member.title}</div>
                <p class="team-bio">${member.bio}</p>
                <div class="team-social">
                    <a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    <a href="${member.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="${member.social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>
        `;
        
        teamGrid.appendChild(teamMember);
    });

    // Testimonial carousel
    let currentTestimonial = 0;
    const testimonialContainer = document.getElementById('testimonials-carousel');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    function renderTestimonials() {
        testimonialContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        testimonialsData.forEach((testimonial, index) => {
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
        currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
        renderTestimonials();
    });
    
    document.querySelector('.next-testimonial').addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
        renderTestimonials();
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
        renderTestimonials();
    }, 5000);
    
    // Pause on hover
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
            renderTestimonials();
        }, 5000);
    });
    
    // Initial render
    renderTestimonials();

    // Community CTA button
    document.querySelector('.community-section .cta-button').addEventListener('click', function() {
        // In a real implementation, this would link to a community page
        alert('Thank you for your interest in our community initiatives!');
    });
});