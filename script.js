// Select the hamburger menu and nav-links elements
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

// Toggle the menu on click
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// JavaScript to handle form submission (basic)
document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    let query = document.getElementById("search-query").value;
    if (query) {
        alert("Searching for: " + query); // This will show an alert with the search query
    } else {
        alert("Please enter a search term.");
    }
});
// JavaScript for Scrolling Functionality
let currentIndex = 0;

const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;
const testimonialContainer = document.querySelector('.testimonial-container');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

function showTestimonials(index) {
    const offset = -index * 330; // 300px width + 30px margin
    testimonialContainer.style.transform = `translateX(${offset}px)`;
}

// Next button click
nextButton.addEventListener('click', () => {
    if (currentIndex < totalTestimonials - 3) {
        currentIndex++;
        showTestimonials(currentIndex);
    }
});

// Prev button click
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showTestimonials(currentIndex);
    }
});

// Initially show first set of testimonials
showTestimonials(currentIndex);
