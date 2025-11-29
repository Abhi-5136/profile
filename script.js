// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Ensure active state is preserved without removing it first
    ensureActiveState();
});

// Function to ensure active state without removing existing active classes
function ensureActiveState() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get the current page filename
    let currentPage = currentPath.split('/').pop();
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const shouldBeActive = linkPath === currentPage;

        if (shouldBeActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Function to set initial active state
function setActiveState() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get the current page filename
    let currentPage = currentPath.split('/').pop();
    if (!currentPage || currentPage === '') {
        currentPage = 'index.html';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');

        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize active state on page load
document.addEventListener('DOMContentLoaded', () => {
    setActiveState();
});

// Also ensure active state on window resize or any other events that might affect it
window.addEventListener('resize', ensureActiveState);

// Additional event listeners to ensure active state persistence
document.addEventListener('mouseover', ensureActiveState);
document.addEventListener('click', ensureActiveState);

// Force active state check every 100ms for the first 3 seconds (temporary fix)
let forceCheckInterval = setInterval(ensureActiveState, 100);
setTimeout(() => {
    clearInterval(forceCheckInterval);
}, 3000);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .cert-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Looping Typing Animation for Home Title
function startTypewriterLoop(element, text, typeSpeed = 120, deleteSpeed = 80, pause = 1000) {
    let index = 0;
    let isDeleting = false;

    const tick = () => {
        element.textContent = text.substring(0, index);

        if (!isDeleting && index === text.length) {
            isDeleting = true;
            setTimeout(tick, pause);
            return;
        }

        if (isDeleting && index === 0) {
            isDeleting = false;
            setTimeout(tick, 300);
            return;
        }

        index += isDeleting ? -1 : 1;
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(tick, speed);
    };

    tick();
}

window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent.trim();
        nameElement.textContent = '';
        startTypewriterLoop(nameElement, originalText);
    }
});

// Random skill card highlighting
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!skillCards.length) return;

    let highlightedCard = null;

    setInterval(() => {
        if (highlightedCard) {
            highlightedCard.classList.remove('highlighted');
        }

        const randomCard = skillCards[Math.floor(Math.random() * skillCards.length)];
        randomCard.classList.add('highlighted');
        highlightedCard = randomCard;
    }, 1500);
});

// Parallax Effect for Floating Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.2);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        // submitBtn.textContent = 'Sending...';
        // submitBtn.disabled = true;
        
        // setTimeout(() => {
        //     showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        //     contactForm.reset();
        //     submitBtn.textContent = originalText;
        //     submitBtn.disabled = false;
        // }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Skill Bar Animation (if you want to add skill bars later)
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease';
        
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Cursor Trail Effect (optional - remove if you don't want it)
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        createTrailParticle(e.clientX, e.clientY);
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.6;
        transition: all 0.5s ease;
    `;
    
    document.body.appendChild(particle);
    mouseTrail.push(particle);
    
    // Animate particle
    setTimeout(() => {
        particle.style.transform = 'scale(0)';
        particle.style.opacity = '0';
    }, 100);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        mouseTrail = mouseTrail.filter(p => p !== particle);
    }, 600);
    
    // Limit trail length
    if (mouseTrail.length > maxTrailLength) {
        const oldParticle = mouseTrail.shift();
        if (oldParticle.parentNode) {
            oldParticle.parentNode.removeChild(oldParticle);
        }
    }
}

// Loading Animation
window.addEventListener('load', () => {
    // Hide loading screen if you add one
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Easter Egg: Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Fun animation or effect
    document.body.style.animation = 'rainbow 2s ease';
    showNotification('🎉 You found the secret! Thanks for exploring!', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(() => {
    // Your scroll handlers here
}, 10));

console.log('Portfolio website loaded successfully! 🚀');
