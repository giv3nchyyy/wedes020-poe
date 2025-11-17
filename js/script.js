// Green Futures Initiative - Enhanced JavaScript with Form Handling
console.log('Green Futures Initiative website loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready - Initializing enhancements');
    
    // Initialize all functionality
    initBackToTop();
    initFormValidation();
    initSmoothScrolling();
    initScrollAnimations();
    initMapPlaceholders();
    
    // SEO enhancements
    updateMetaTags();
    initLazyLoading();
});

// Back to Top Functionality
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.setAttribute('title', 'Back to top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Form Validation and Handling
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        // Add real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
                if (this.value.trim() !== '') {
                    validateField(this);
                }
            });
        });
        
        // Form submission handling
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                handleFormSubmission(this);
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    clearError(field);
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if ((field.name === 'phone' || field.name === 'contactPhone') && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Text area minimum length
    if (field.type === 'textarea' && value.length < 10) {
        showError(field, 'Please enter at least 10 characters');
        return false;
    }
    
    return true;
}

function showError(field, message) {
    field.style.borderColor = '#e74c3c';
    field.style.background = '#fdf2f2';
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.5rem';
    errorElement.style.fontWeight = '600';
}

function clearError(field) {
    field.style.borderColor = '#e0e0e0';
    field.style.background = '#f8f9fa';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showSuccessMessage(form);
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        form.reset();
    }, 2000);
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 10px; margin: 1rem 0; border: 1px solid #c3e6cb;">
            <strong>Success!</strong> Thank you for your message. We'll get back to you soon!
        </div>
    `;
    
    form.parentNode.insertBefore(successMessage, form);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.story-card, .team-member, .stat-item, .number-item, .location-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Set initial state
    const animatedElements = document.querySelectorAll('.story-card, .team-member, .stat-item, .number-item, .location-card');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}

// Map Placeholders (for Part 3 - will be replaced with real maps)
function initMapPlaceholders() {
    const mapContainers = document.querySelectorAll('.map-placeholder');
    
    mapContainers.forEach(container => {
        container.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                       height: 300px; 
                       border-radius: 15px; 
                       display: flex; 
                       align-items: center; 
                       justify-content: center; 
                       color: white; 
                       font-weight: bold;
                       text-align: center;
                       padding: 2rem;">
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
                    <h3>Interactive Map</h3>
                    <p>Google Maps integration coming in final implementation</p>
                    <p><small>Location: ${container.dataset.location || 'Green Futures Office'}</small></p>
                </div>
            </div>
        `;
    });
}

// SEO Enhancements
function updateMetaTags() {
    // Update page title dynamically
    const pageTitle = document.title;
    if (!document.querySelector('meta[name="description"]')) {
        const metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        metaDesc.content = "Green Futures Initiative - Creating sustainable food gardens in schools across South Africa. Join our mission for environmental education.";
        document.head.appendChild(metaDesc);
    }
    
    // Add canonical URL
    if (!document.querySelector('link[rel="canonical"]')) {
        const canonical = document.createElement('link');
        canonical.rel = "canonical";
        canonical.href = window.location.href;
        document.head.appendChild(canonical);
    }
}

// Lazy Loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Advanced responsive features
function initAdvancedResponsive() {
    // Handle mobile menu
    initMobileMenu();
    
    // Handle touch device detection
    detectTouchDevice();
}

function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.className = 'mobile-menu-button';
        menuButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        nav.insertBefore(menuButton, navLinks);
        
        menuButton.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
        });
    }
}

function detectTouchDevice() {
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch-device');
    }
}

// Export functions for global access (for debugging)
window.GreenFutures = {
    validateForm,
    validateField,
    initMapPlaceholders
};