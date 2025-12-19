// ===== LOAD CMS DATA =====
window.addEventListener('DOMContentLoaded', () => {
    loadCMSData();
});

function loadCMSData() {
    // Load Hero Data
    const heroData = JSON.parse(localStorage.getItem('heroData'));
    if (heroData) {
        document.querySelector('.hero-content h1').textContent = `Halo, Saya ${heroData.name}`;
        document.querySelector('.hero-content h2').textContent = heroData.title;
        document.querySelector('.hero-content p').textContent = heroData.description;
    }

    // Load About Data
    const aboutData = JSON.parse(localStorage.getItem('aboutData'));
    if (aboutData) {
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            aboutText.querySelector('h3').textContent = aboutData.title;
            const paragraphs = aboutText.querySelectorAll('p');
            if (paragraphs[0]) paragraphs[0].textContent = aboutData.para1;
            if (paragraphs[1]) paragraphs[1].textContent = aboutData.para2;
            if (paragraphs[2]) paragraphs[2].textContent = aboutData.para3;
        }
    }

    // Load Skills Data
    const skillsData = JSON.parse(localStorage.getItem('skillsData'));
    if (skillsData && skillsData.length > 0) {
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = skillsData.map(skill => `
                <div class="skill-card">
                    <div class="skill-icon">${skill.icon}</div>
                    <h3>${skill.name}</h3>
                    <p>${skill.description}</p>
                </div>
            `).join('');
        }
    }

    // Load Projects Data
    const projectsData = JSON.parse(localStorage.getItem('projectsData'));
    if (projectsData && projectsData.length > 0) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = projectsData.map((project, index) => `
                <div class="project-card">
                    <img class="project-image" id="project${index + 1}Image" src="images/project${(index % 3) + 1}.jpg" alt="${project.name}">
                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank">Demo</a>` : ''}
                            ${project.github ? `<a href="${project.github}" class="project-link" target="_blank">GitHub</a>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.textContent = '☰';
    });
});

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((element) => {
    observer.observe(element);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission with EmailJS
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get button element
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Mengirim...';
    submitButton.disabled = true;

    // EmailJS Configuration
    const serviceID = 'service_tw2es5a';
    const templateID = 'template_nc4knpl';

    // Send email using EmailJS
    emailjs.sendForm(serviceID, templateID, contactForm)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);

            // Show success message
            alert('✅ Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda.');

            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        })
        .catch((error) => {
            console.error('FAILED...', error);

            // Show error message
            alert('❌ Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi saya melalui email langsung.');

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});

// Add typing effect to hero section
const heroTitle = document.querySelector('.hero-content h2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Add hover effect to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', function () {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
