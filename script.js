// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupSmoothScrolling();
    setupMobileMenu();
    setupSearch();
    setupAnimations();
    setupContactForm();
    loadResources();
    setupScrollEffects();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Update active navigation on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
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
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('mobile')) {
                toggleMobileMenu();
            }
        });
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    function toggleMobileMenu() {
        navMenu.classList.toggle('mobile');
        navToggle.innerHTML = navMenu.classList.contains('mobile')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('mobile');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('resource-search');
    const resourcesGrid = document.getElementById('resources-grid');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const resourceCards = resourcesGrid.querySelectorAll('.resource-card');

            resourceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';

                if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Get Default Resources
function getDefaultResources() {
    return [
        {
            title: 'Contraception Methods',
            description: 'Learn about different types of contraception and how to choose what\'s right for you.',
            icon: 'fas fa-shield-alt',
            tags: 'contraception birth-control family-planning',
            category: 'Family Planning'
        },
        {
            title: 'STI Prevention & Testing',
            description: 'Information about sexually transmitted infections, prevention, and testing services.',
            icon: 'fas fa-virus',
            tags: 'sti std prevention testing health',
            category: 'Sexual Health'
        },
        {
            title: 'Menstrual Health',
            description: 'Understanding your menstrual cycle, managing periods, and reproductive health.',
            icon: 'fas fa-calendar-alt',
            tags: 'periods menstruation cycle health',
            category: 'Reproductive Health'
        },
        {
            title: 'Pregnancy Planning',
            description: 'Resources for those planning pregnancy or wanting to avoid unplanned pregnancy.',
            icon: 'fas fa-baby',
            tags: 'pregnancy planning fertility family',
            category: 'Family Planning'
        },
        {
            title: 'Mental Health Support',
            description: 'Mental health resources and support for sexual and reproductive health concerns.',
            icon: 'fas fa-brain',
            tags: 'mental-health support counseling therapy',
            category: 'Mental Health'
        },
        {
            title: 'Gender & Sexuality',
            description: 'Information about gender identity, sexual orientation, and LGBTQ+ health.',
            icon: 'fas fa-rainbow',
            tags: 'gender sexuality lgbtq identity',
            category: 'Identity & Sexuality'
        },
        {
            title: 'Emergency Contraception',
            description: 'Information about emergency contraception options and when to use them.',
            icon: 'fas fa-exclamation-triangle',
            tags: 'emergency contraception morning-after pill',
            category: 'Emergency Care'
        },
        {
            title: 'Healthy Relationships',
            description: 'Building healthy relationships, consent, and communication skills.',
            icon: 'fas fa-heart',
            tags: 'relationships consent communication healthy',
            category: 'Relationships'
        }
    ];
}

// Load Resources
function loadResources() {
    const resourcesGrid = document.getElementById('resources-grid');

    if (!resourcesGrid) return;

    // Try to load from localStorage (admin-managed resources), fallback to defaults
    let resources = [];
    const savedResources = localStorage.getItem('srhr_resources');

    if (savedResources) {
        try {
            resources = JSON.parse(savedResources);
        } catch (error) {
            console.error('Error loading saved resources:', error);
            resources = getDefaultResources();
        }
    } else {
        resources = getDefaultResources();
    }

    resources.forEach((resource, index) => {
        const resourceCard = createResourceCard(resource, index);
        resourcesGrid.appendChild(resourceCard);
    });
}

// Create Resource Card
function createResourceCard(resource, index) {
    const card = document.createElement('div');
    card.className = 'resource-card fade-in-up';
    card.dataset.tags = resource.tags;
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
        <div class="resource-icon">
            <i class="${resource.icon}"></i>
        </div>
        <div class="resource-category">${resource.category}</div>
        <h3>${resource.title}</h3>
        <p>${resource.description}</p>
        <div class="resource-actions">
            <a href="#" class="resource-link">Read More</a>
            <button class="resource-favorite" aria-label="Add to favorites">
                <i class="far fa-heart"></i>
            </button>
        </div>
    `;

    // Add favorite functionality
    const favoriteBtn = card.querySelector('.resource-favorite');
    favoriteBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.classList.toggle('favorited');

        if (icon.classList.contains('favorited')) {
            showNotification('Added to favorites!');
        }
    });

    return card;
}

// Setup Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.service-card, .resource-card, .contact-item').forEach(card => {
        observer.observe(card);
    });
}

// Contact Form Handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Formspree handle the submission
            // e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnLoading = document.getElementById('btnLoading');
            const formMessage = document.getElementById('formMessage');

            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            // Formspree will handle the actual submission and redirect
            // If you want to handle it with JavaScript instead, uncomment the code below:

            /*
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.reset();

                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }, 2000);
            */
        });
    }
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Header shadow on scroll
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Add notification styles dynamically
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }

        .notification-success {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        }

        .notification-info {
            background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%);
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }

        .notification-close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 0.875rem;
            opacity: 0.8;
            transition: opacity var(--transition-fast);
        }

        .notification-close:hover {
            opacity: 1;
        }

        .header.scrolled {
            box-shadow: var(--shadow-lg);
        }
    `;
    document.head.appendChild(style);
}

// Initialize notification styles
addNotificationStyles();

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}

// Accessibility improvements
function setupAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels where needed
    const searchInput = document.getElementById('resource-search');
    if (searchInput) {
        searchInput.setAttribute('aria-label', 'Search health resources');
    }
}

// Initialize accessibility features
setupAccessibility();
