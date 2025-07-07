
// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add event listeners for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize interactive elements
    initializeInteractiveElements();
});

// Contact form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showToast("Please fill in all fields", "All fields are required to send a message.", "error");
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Invalid email address", "Please enter a valid email address.", "error");
        return;
    }
    
    // Success message
    showToast("Message sent successfully!", "Thank you for reaching out. I'll get back to you soon.", "success");
    
    // Reset form
    e.target.reset();
}

// Toast notification system
function showToast(title, description, type = "success") {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastDescription = document.getElementById('toastDescription');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Add type-specific styling
    toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.skill-category, .timeline-item, .feature-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const animatedSections = document.querySelectorAll('.about-section, .experience-section, .skills-section, .projects-section, .contact-section');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Interactive elements initialization
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .timeline-card, .skill-category, .project-card, .contact-method');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add interactive particles on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParticles);
            ticking = true;
        }
    });

    function updateParticles() {
        const scrollY = window.scrollY;
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = scrollY * speed;
            particle.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }

    // Add parallax effect to background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add dynamic typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.animationDuration = '1s';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.animationDuration = '3s';
        });
    }

    // Music visualizer interaction
    const visualizerBars = document.querySelectorAll('.visualizer-bar');
    const projectCard = document.querySelector('.project-card');
    
    if (projectCard && visualizerBars.length > 0) {
        projectCard.addEventListener('mouseenter', function() {
            visualizerBars.forEach((bar, index) => {
                bar.style.animationDuration = '0.5s';
                bar.style.animationDelay = `${index * 0.05}s`;
            });
        });
        
        projectCard.addEventListener('mouseleave', function() {
            visualizerBars.forEach((bar, index) => {
                bar.style.animationDuration = '1s';
                bar.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }
}

// Navbar scroll behavior
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'blur(16px)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        const toast = document.getElementById('toast');
        if (toast.classList.contains('show')) {
            toast.classList.remove('show');
        }
    }
});

// Performance optimization: Lazy load images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images are present
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add CSS for toast error styling
const style = document.createElement('style');
style.textContent = `
    .toast-error {
        border-left: 4px solid #ef4444;
    }
    
    .toast-success {
        border-left: 4px solid #10b981;
    }
    
    .toast-error .toast-title {
        color: #dc2626;
    }
    
    .toast-success .toast-title {
        color: #059669;
    }
`;
document.head.appendChild(style);