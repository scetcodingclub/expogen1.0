// DOM Elements
const loader = document.querySelector('.loader-wrapper');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const backToTopBtn = document.getElementById('backToTop');
const accordionItems = document.querySelectorAll('.accordion-item');
const navItems = document.querySelectorAll('.nav-links ul li a');
const registrationForm = document.getElementById('registrationForm');

// Window Load
window.addEventListener('load', () => {
    // Hide loader
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
    
    // Check scroll position on load
    checkScrollPosition();
});

// Scroll Events
window.addEventListener('scroll', () => {
    // Navbar scroll effect
    checkScrollPosition();
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Add animation to elements when they come into view
    animateOnScroll();
});

// Function to check scroll position and update navbar
function checkScrollPosition() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile Menu
openMenuBtn.addEventListener('click', () => {
    navLinks.classList.add('show');
});

closeMenuBtn.addEventListener('click', () => {
    navLinks.classList.remove('show');
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('show');
        
        // Update active class
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
    });
});

// Back to Top button
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Accordion
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-item.active');
        
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        
        item.classList.toggle('active');
        
        // Update icon
        const icon = item.querySelector('.accordion-icon i');
        if (item.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
});

// Form Submission
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registrationForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message (in production, you would send this data to a server)
        alert('Registration successful! Thank you for registering for EXPOGEN 1.0.');
        registrationForm.reset();
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const threshold = 100;
        
        if (elementPosition < windowHeight - threshold) {
            const delay = element.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                element.classList.add('animated');
                element.style.opacity = '1';
                
                switch (element.getAttribute('data-aos')) {
                    case 'fade-up':
                        element.style.transform = 'translateY(0)';
                        break;
                    case 'fade-down':
                        element.style.transform = 'translateY(0)';
                        break;
                    case 'fade-left':
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'fade-right':
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'flip-up':
                        element.style.transform = 'rotateX(0)';
                        break;
                    case 'flip-down':
                        element.style.transform = 'rotateX(0)';
                        break;
                    case 'zoom-in':
                        element.style.transform = 'scale(1)';
                        break;
                    default:
                        break;
                }
            }, delay);
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset with navbar height
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        }
    });
});

// Initialize AOS elements
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for AOS elements
    const aosElements = document.querySelectorAll('[data-aos]');
    
    aosElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s ease';
        
        switch (element.getAttribute('data-aos')) {
            case 'fade-up':
                element.style.transform = 'translateY(50px)';
                break;
            case 'fade-down':
                element.style.transform = 'translateY(-50px)';
                break;
            case 'fade-left':
                element.style.transform = 'translateX(50px)';
                break;
            case 'fade-right':
                element.style.transform = 'translateX(-50px)';
                break;
            case 'flip-up':
                element.style.transform = 'rotateX(90deg)';
                break;
            case 'flip-down':
                element.style.transform = 'rotateX(-90deg)';
                break;
            case 'zoom-in':
                element.style.transform = 'scale(0.5)';
                break;
            default:
                break;
        }
    });
    
    // Run animation once on page load
    animateOnScroll();
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Check which section is in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 20;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to corresponding nav item
            const activeNavItem = document.querySelector(`.nav-links ul li a[href="#${sectionId}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    });
    
    // Special case for home section
    if (scrollPosition < 100) {
        navItems.forEach(item => item.classList.remove('active'));
        document.querySelector('.nav-links ul li a[href="#home"]').classList.add('active');
    }
});