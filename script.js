// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Image loading animation
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    }
});

// Gallery functionality
const galleryMain = document.getElementById('gallery-main-img');
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let currentIndex = 0;

function updateGallery(index) {
    // Update main image
    galleryMain.src = galleryThumbs[index].dataset.img;
    galleryMain.classList.add('loaded');
    
    // Update thumbnails
    galleryThumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

galleryThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = index;
        updateGallery(currentIndex);
    });
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryThumbs.length) % galleryThumbs.length;
    updateGallery(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryThumbs.length;
    updateGallery(currentIndex);
});

// Auto-advance gallery
let galleryInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % galleryThumbs.length;
    updateGallery(currentIndex);
}, 5000);

// Pause auto-advance on hover
const galleryContainer = document.querySelector('.gallery-container');
galleryContainer.addEventListener('mouseenter', () => {
    clearInterval(galleryInterval);
});

galleryContainer.addEventListener('mouseleave', () => {
    galleryInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryThumbs.length;
        updateGallery(currentIndex);
    }, 5000);
});

// Form validation and enhancement
const searchForm = document.querySelector('.search-form');
const contactForm = document.querySelector('.contact-form form');

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your search form submission logic here
        console.log('Search form submitted');
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your contact form submission logic here
        console.log('Contact form submitted');
    });
}

// Input focus effects
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.querySelectorAll('.stat-card, .service-card, .about-content, .gallery-container, .contact-container').forEach(el => {
    el.classList.add('fade-in-element');
    observer.observe(el);
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('loading');
        button.disabled = true;
        
        // Simulate loading state (remove in production)
        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
        }, 1500);
    });
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loading {
        position: relative;
        color: transparent !important;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .focused {
        position: relative;
    }
    
    .focused::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--accent-color);
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }
    
    .focused:focus-within::after {
        transform: scaleX(1);
    }
`;

document.head.appendChild(style);
