// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing animation for hero text
const text = "Full Stack Developer | AI Enthusiast";
const typingText = document.querySelector('.typing-text');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                navbar.classList.remove('scroll-down');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Error sending message. Please try again later.');
        console.error('Error:', error);
    }
});

// Skill progress animation
const skillCards = document.querySelectorAll('.skill-card');

const animateSkills = () => {
    skillCards.forEach((card, index) => {
        const progress = card.querySelector('.progress');
        const width = progress.style.width;
        progress.style.width = '0';
        
        setTimeout(() => {
            progress.style.width = width;
            card.classList.add('animate');
        }, index * 200);
    });
};

// Animate skills when they come into view
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Enhanced spider web animation with nodes and lines
const spiderWeb = document.querySelector('.spider-web');
let mouseX = 0;
let mouseY = 0;
let webRotation = 0;
let nodes = [];
let lines = [];

// Create spider web nodes
function createSpiderWebNodes() {
    const numNodes = 15;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;

    for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const node = document.createElement('div');
        node.className = 'spider-web-node';
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        spiderWeb.appendChild(node);
        nodes.push({ element: node, x, y });
    }

    // Create connecting lines
    createConnectingLines();
}

// Create connecting lines between nodes
function createConnectingLines() {
    nodes.forEach((node1, i) => {
        nodes.forEach((node2, j) => {
            if (i < j) {
                const line = document.createElement('div');
                line.className = 'spider-web-line';
                spiderWeb.appendChild(line);
                lines.push({
                    element: line,
                    node1,
                    node2
                });
            }
        });
    });
}

// Update spider web elements
function updateSpiderWeb(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const x = (mouseX / window.innerWidth - 0.5) * 20;
    const y = (mouseY / window.innerHeight - 0.5) * 20;
    
    webRotation += 0.1;
    spiderWeb.style.transform = `
        rotate(${webRotation}deg) 
        translate(${x}px, ${y}px)
        scale(${1 + Math.abs(x) * 0.001})
    `;

    // Update nodes and lines
    updateNodesAndLines(x, y);
}

// Update nodes and lines positions
function updateNodesAndLines(offsetX, offsetY) {
    // Update nodes
    nodes.forEach(node => {
        const distance = Math.sqrt(
            Math.pow(node.x - mouseX, 2) + 
            Math.pow(node.y - mouseY, 2)
        );
        
        const maxDistance = 300;
        const influence = Math.max(0, 1 - distance / maxDistance);
        
        const moveX = (mouseX - node.x) * influence * 0.1;
        const moveY = (mouseY - node.y) * influence * 0.1;
        
        node.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Update lines
    lines.forEach(line => {
        const node1 = line.node1;
        const node2 = line.node2;
        
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        line.element.style.width = `${length}px`;
        line.element.style.left = `${node1.x}px`;
        line.element.style.top = `${node1.y}px`;
        line.element.style.transform = `rotate(${angle}deg)`;
    });
}

// Initialize spider web
createSpiderWebNodes();
document.addEventListener('mousemove', updateSpiderWeb);

// Update spider web on window resize
window.addEventListener('resize', () => {
    // Clear existing nodes and lines
    nodes.forEach(node => node.element.remove());
    lines.forEach(line => line.element.remove());
    nodes = [];
    lines = [];
    
    // Recreate spider web
    createSpiderWebNodes();
});

// Parallax effect for sections
const sections = document.querySelectorAll('section');
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mouse trail effect
const trail = document.createElement('div');
trail.className = 'mouse-trail';
document.body.appendChild(trail);

let trailPoints = [];
const maxTrailPoints = 20;

document.addEventListener('mousemove', (e) => {
    trailPoints.push({ x: e.clientX, y: e.clientY });
    if (trailPoints.length > maxTrailPoints) {
        trailPoints.shift();
    }
    
    const trailHTML = trailPoints.map((point, index) => {
        const size = (index / maxTrailPoints) * 10;
        return `<div class="trail-point" style="left: ${point.x}px; top: ${point.y}px; width: ${size}px; height: ${size}px;"></div>`;
    }).join('');
    
    trail.innerHTML = trailHTML;
});

// Interactive project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Add CSS for mouse trail
const style = document.createElement('style');
style.textContent = `
    .mouse-trail {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
    }
    
    .trail-point {
        position: absolute;
        background: var(--gradient-1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.5;
        transition: all 0.1s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    });
});

// Mobile Navigation Active State
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

function updateMobileNavActive() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateMobileNavActive);
window.addEventListener('load', updateMobileNavActive); 