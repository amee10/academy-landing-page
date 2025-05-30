// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle menu icon
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling
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
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Animation on Scroll for all animated elements
    const animateOnScroll = debounce(() => {
        // Animate audience items
        const audienceItems = document.querySelectorAll('.audience-item');
        audienceItems.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });

        // Animate Why JavaScript section
        const whyJsContent = document.querySelector('.why-js-content');
        const whyJsImage = document.querySelector('.why-js-image');
        const benefitsItems = document.querySelectorAll('.benefits-list li');
        
        if (whyJsContent) {
            const elementTop = whyJsContent.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                whyJsContent.classList.add('visible');
                benefitsItems.forEach(item => item.classList.add('visible'));
            }
        }
        
        if (whyJsImage) {
            const elementTop = whyJsImage.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                whyJsImage.classList.add('visible');
            }
        }

        // Animate project cards
        const projectCardsContainer = document.querySelector('.project-cards');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (projectCardsContainer) {
            const containerTop = projectCardsContainer.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (containerTop < window.innerHeight - elementVisible) {
                projectCardsContainer.classList.add('visible');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }
        }

        // Animate learning items with staggered delay
        const learningSection = document.querySelector('#learn');
        const learningItems = document.querySelectorAll('.learning-item');
        
        if (learningSection) {
            const sectionTop = learningSection.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (sectionTop < window.innerHeight - elementVisible) {
                learningItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        }

        // Animate timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const elementTop = item.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200); // Larger delay for more pronounced effect
            }
        });

        // Animate What's Included items
        const includedItems = document.querySelectorAll('.included-item');
        includedItems.forEach((item, index) => {
            const elementTop = item.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150); // Staggered animation delay
            }
        });
    }, 15);

    // Register Form Handling
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form validation here if needed
            alert('Registration submitted successfully!');
            registerForm.reset();
        });
    }

    // Register Button Actions
    const registerButtons = document.querySelectorAll('.cta-button, .submit-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!e.target.closest('form')) {
                const registerSection = document.querySelector('#register');
                if (registerSection) {
                    const headerOffset = 80;
                    const elementPosition = registerSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // FAQ Interactions
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const content = otherItem.querySelector('.faq-content');
                    content.style.height = '0px';
                }
            });

            // Toggle active class on clicked item
            item.classList.toggle('active');
            const content = item.querySelector('.faq-content');
            
            if (item.classList.contains('active')) {
                content.style.height = content.scrollHeight + 'px';
            } else {
                content.style.height = '0px';
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const updateActiveLink = debounce(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    }, 20);

    // Parallax Effect for Hero Section
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    const updateParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        
        if (window.innerWidth > 768 && heroContent && heroImage) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        } else {
            heroContent.style.transform = 'none';
            heroImage.style.transform = 'none';
        }
    }, 10);

    // Mouse move effects for hero section
    const hero = document.querySelector('.hero');

    // Create cursor follower element
    const cursorEffect = document.createElement('div');
    cursorEffect.className = 'cursor-effect';
    hero.appendChild(cursorEffect);

    // Add styles for cursor effect
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-effect {
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(246, 139, 4, 0.15), transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 1;
            transition: width 0.3s, height 0.3s;
        }

        .hero {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(cursorStyle);

    // Mouse move handler
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update cursor effect position
        cursorEffect.style.left = x + 'px';
        cursorEffect.style.top = y + 'px';

        // Parallax effect for content and image
        const xPercent = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const yPercent = (e.clientY - window.innerHeight / 2) / window.innerHeight;

        if (window.innerWidth > 768) {
            heroContent.style.transform = `translate(${xPercent * 20}px, ${yPercent * 20}px)`;
            heroImage.style.transform = `translate(${xPercent * -20}px, ${yPercent * -20}px)`;
        }
    });

    // Handle mouse enter/leave
    hero.addEventListener('mouseenter', () => {
        cursorEffect.style.opacity = '1';
    });

    hero.addEventListener('mouseleave', () => {
        cursorEffect.style.opacity = '0';
        heroContent.style.transform = 'translate(0, 0)';
        heroImage.style.transform = 'translate(0, 0)';
    });

    // Handle hover effects on interactive elements (only tech badges and icons)
    const interactiveElements = hero.querySelectorAll('.tech-badge, .floating-icon');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorEffect.style.width = '150px';
            cursorEffect.style.height = '150px';
            cursorEffect.style.background = 'radial-gradient(circle, rgba(246, 139, 4, 0.25), transparent 70%)';
        });

        element.addEventListener('mouseleave', () => {
            cursorEffect.style.width = '100px';
            cursorEffect.style.height = '100px';
            cursorEffect.style.background = 'radial-gradient(circle, rgba(246, 139, 4, 0.15), transparent 70%)';
        });
    });

    // Mouse trail effect for hero section
    const trailContainer = document.createElement('div');
    trailContainer.className = 'mouse-trail-container';
    hero.appendChild(trailContainer);

    // Add styles for mouse trail
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        .mouse-trail-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        }
        .trail-particle {
            position: absolute;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            transform: scale(0);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(trailStyle);

    let particles = [];
    const particleCount = 15;
    const particleLifetime = 1000; // milliseconds
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Create particle pool
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        trailContainer.appendChild(particle);
        particles.push({
            element: particle,
            active: false,
            x: 0,
            y: 0,
            size: Math.random() * 10 + 5,
            speedX: 0,
            speedY: 0
        });
    }

    // Mouse move handler
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        // Calculate mouse speed
        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Create new particle
        const inactiveParticle = particles.find(p => !p.active);
        if (inactiveParticle && speed > 2) {
            inactiveParticle.active = true;
            inactiveParticle.x = mouseX;
            inactiveParticle.y = mouseY;
            inactiveParticle.speedX = dx * 0.2;
            inactiveParticle.speedY = dy * 0.2;
            
            const particle = inactiveParticle.element;
            particle.style.width = inactiveParticle.size + 'px';
            particle.style.height = inactiveParticle.size + 'px';
            particle.style.left = mouseX + 'px';
            particle.style.top = mouseY + 'px';
            particle.style.opacity = '0.6';
            particle.style.transform = 'scale(1)';
            
            setTimeout(() => {
                inactiveParticle.active = false;
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0)';
            }, particleLifetime);
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
    });

    // Animation loop
    function updateParticles() {
        particles.forEach(particle => {
            if (particle.active) {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.speedX *= 0.98;
                particle.speedY *= 0.98;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            }
        });
        requestAnimationFrame(updateParticles);
    }
    updateParticles();

    // Handle mouse enter/leave
    hero.addEventListener('mouseleave', () => {
        particles.forEach(particle => {
            particle.active = false;
            particle.element.style.opacity = '0';
            particle.element.style.transform = 'scale(0)';
        });
    });

    // Initialize everything
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        animateOnScroll();
        updateActiveLink();
        updateParallax();
    });

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        animateOnScroll();
        updateActiveLink();
        updateParallax();
    });
}); 