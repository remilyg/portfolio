// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            gsap.to(this.cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1
            });
            
            gsap.to(this.cursorFollower, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.3
            });
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .contact-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.5)';
                this.cursor.style.background = 'var(--accent-secondary)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
                this.cursor.style.background = 'var(--accent-primary)';
            });
        });
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Project Filter
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(button);
            });
        });
    }

    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    display: 'block'
                });
            } else {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    display: 'none'
                });
            }
        });
    }

    updateActiveButton(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Hero section animations
        gsap.from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        gsap.from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });

        gsap.from('.hero-cta', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out'
        });

        // Floating card animation
        gsap.from('.floating-card', {
            x: 100,
            opacity: 0,
            duration: 1.5,
            delay: 0.3,
            ease: 'power3.out'
        });

        // Project cards animation
        gsap.from('.project-card', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Skills animation
        gsap.from('.skill-progress', {
            width: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Timeline animation
        gsap.from('.timeline-item', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.experience-timeline',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Contact form animation
        gsap.from('.contact-form', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.from('.contact-info', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

// Form Interactions
class FormInteractions {
    constructor() {
        this.form = document.querySelector('.form');
        this.init();
    }

    init() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Let the form submit naturally to Formspree
        // The form will open in a new tab due to target="_blank"
        
        // Reset button after a delay
        setTimeout(() => {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
            this.form.reset();
        }, 3000);
    }
}

// Navigation Interactions
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.style.background = 'rgba(10, 10, 10, 0.95)';
                this.nav.style.backdropFilter = 'blur(20px)';
            } else {
                this.nav.style.background = 'rgba(10, 10, 10, 0.8)';
                this.nav.style.backdropFilter = 'blur(20px)';
            }
        });

        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        // Floating card parallax
        window.addEventListener('mousemove', (e) => {
            const floatingCard = document.querySelector('.floating-card');
            if (floatingCard) {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                
                gsap.to(floatingCard, {
                    x: x,
                    y: y,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });

        // Scroll parallax for sections
        gsap.to('.hero-background', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

// Loading Screen
class LoadingScreen {
    constructor() {
        this.loading = document.querySelector('.loading');
        this.init();
    }

    init() {
        // Hide loading screen after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loading.classList.add('hidden');
                setTimeout(() => {
                    this.loading.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
    new ParticleSystem();
    new SmoothScroll();
    new ProjectFilter();
    new ScrollAnimations();
    new FormInteractions();
    new Navigation();
    new ParallaxEffects();
    new LoadingScreen();
    
    // Update copyright year automatically
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Add loading screen to DOM
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
document.body.appendChild(loadingScreen);

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            width: 100vw;
            max-width: 100vw;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px);
            padding: 2rem 1rem;
            flex-direction: column;
            gap: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            box-sizing: border-box;
            overflow-x: hidden;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-menu a {
            width: 100%;
            text-align: center;
            padding: 1rem;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .nav-menu a:hover {
            background: rgba(0, 212, 255, 0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    @media (max-width: 480px) {
        .nav-menu {
            padding: 1.5rem 0.75rem;
        }
        
        .nav-menu a {
            padding: 0.875rem;
            font-size: 0.875rem;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Add CSS for animate-in class
const animateInStyles = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const animateInStyleSheet = document.createElement('style');
animateInStyleSheet.textContent = animateInStyles;
document.head.appendChild(animateInStyleSheet);

// Radar Chart for Skills
class SkillsRadarChart {
    constructor() {
        this.canvas = document.getElementById('skillsChart');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = 120;
        
        this.skills = [
            { name: 'Shopify & Liquid', value: 95 },
            { name: 'HTML5 & CSS3', value: 92 },
            { name: 'JavaScript (ES6+)', value: 90 },
            { name: 'Bootstrap & Tailwind', value: 88 },
            { name: 'Git & VS Code', value: 85 }
        ];
        
        this.init();
    }
    
    init() {
        this.drawGrid();
        this.drawSkills();
    }
    
    drawGrid() {
        const ctx = this.ctx;
        const centerX = this.centerX;
        const centerY = this.centerY;
        const radius = this.radius;
        
        // Draw concentric circles
        for (let i = 1; i <= 5; i++) {
            const currentRadius = (radius / 5) * i;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Draw axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < this.skills.length; i++) {
            const angle = (i * 2 * Math.PI) / this.skills.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    
    drawSkills() {
        const ctx = this.ctx;
        const centerX = this.centerX;
        const centerY = this.centerY;
        const radius = this.radius;
        
        // Draw skills polygon
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.8)';
        ctx.lineWidth = 2;
        
        this.skills.forEach((skill, i) => {
            const angle = (i * 2 * Math.PI) / this.skills.length - Math.PI / 2;
            const skillRadius = (radius * skill.value) / 100;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

// Initialize radar chart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsRadarChart();
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Remove any existing event listeners
        const newForm = contactForm.cloneNode(true);
        contactForm.parentNode.replaceChild(newForm, contactForm);
        
        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const submitBtn = newForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Use native form submission instead of fetch
                const formData = new FormData(newForm);
                
                // Log form data for debugging
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                
                // Submit using native form method
                const tempForm = document.createElement('form');
                tempForm.method = 'POST';
                tempForm.action = newForm.action;
                tempForm.target = '_blank';
                
                // Add form data
                for (let [key, value] of formData.entries()) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    tempForm.appendChild(input);
                }
                
                document.body.appendChild(tempForm);
                tempForm.submit();
                document.body.removeChild(tempForm);
                
                // Success
                console.log('Form submitted successfully');
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
                submitBtn.disabled = false;
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    newForm.reset();
                }, 5000);
                
            } catch (error) {
                // Error
                console.error('Form submission error:', error);
                submitBtn.textContent = 'Failed to Send';
                submitBtn.style.background = 'linear-gradient(135deg, #ff0080, #ff6b6b)';
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 5000);
            }
        });
    }
});
