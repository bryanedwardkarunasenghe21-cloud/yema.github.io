// ==========================================================================
// 1. DYNAMIC TYPING EFFECT
// ==========================================================================
const typingWords = ["Student Developer", "CS Major", "Problem Solver", "Web Creator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const eraseSpeed = 50;
const delayBetweenWords = 1800;

function typeEffect() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const currentWord = typingWords[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        setTimeout(typeEffect, 300);
    } else {
        setTimeout(typeEffect, isDeleting ? eraseSpeed : typingSpeed);
    }
}

// ==========================================================================
// 2. THEME TOGGLE (DARK / LIGHT MODE)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');

function initTheme() {
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });
}

// ==========================================================================
// 3. MOBILE MENU TOGGLE
// ==========================================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    });
});

// ==========================================================================
// 4. PROJECTS CATEGORY FILTER
// ==========================================================================
const filterBtns = document.querySelectorAll('.project-filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==========================================================================
// 5. PROJECT MODAL & DATA
// ==========================================================================
const projectData = [
    {
        title: "Campus Event & Hub Portal",
        category: "Web Development",
        course: "CS301 Capstone Project",
        image: "https://placehold.co/800x500/2563eb/ffffff?text=Campus+Portal+Details",
        description: "Developed a comprehensive web portal designed to centralize student extracurricular events, room reservations, and club announcements. Features include responsive layout design, interactive event calendar, integrated registration system, and role-based access control for student leaders.",
        tags: ["JavaScript", "HTML5", "CSS3", "Node.js", "SQLite"]
    },
    {
        title: "A* Pathfinding Visualizer",
        category: "Software & Algorithms",
        course: "CS202 Data Structures & Algorithms",
        image: "https://placehold.co/800x500/0d9488/ffffff?text=Pathfinding+Visualizer+Details",
        description: "An algorithmic visualizer tool that allows users to place start/end nodes, construct wall obstacles, and observe the search traversal of Dijkstra's and A* pathfinding algorithms in real-time. Created as a term project to explore graph theory efficiency.",
        tags: ["Python", "Pygame", "Graph Algorithms", "Data Structures"]
    },
    {
        title: "Academic Performance Predictor",
        category: "Data Science & Research",
        course: "CS410 Data Science Lab",
        image: "https://placehold.co/800x500/4f46e5/ffffff?text=Data+Predictor+Details",
        description: "Applied machine learning classification models to anonymized academic performance datasets. Cleaned raw data, generated correlation heatmaps, and evaluated decision tree vs. logistic regression accuracy for predicting student retention rates.",
        tags: ["Python", "Pandas", "Scikit-Learn", "Jupyter"]
    },
    {
        title: "Study Tracker & Planner Dashboard",
        category: "Web Development",
        course: "CS205 Web Applications",
        image: "https://placehold.co/800x500/ea580c/ffffff?text=Study+Tracker+Details",
        description: "A client-side study planner built to help students manage course assignments, set study timers, and organize tasks with customizable Kanban columns. Utilizes LocalStorage for data persistence and includes dark mode support.",
        tags: ["React", "JavaScript", "HTML5", "LocalStorage"]
    },
    {
        title: "Smart Library DBMS",
        category: "Software & Database",
        course: "CS340 Database Systems",
        image: "https://placehold.co/800x500/9333ea/ffffff?text=Database+System+Details",
        description: "Designed a relational database schema (3NF compliance) to support book inventory, catalog search, automated late fine calculations, and member checkouts for a campus library environment.",
        tags: ["SQL", "MySQL", "Java", "JDBC"]
    },
    {
        title: "Campus Air Quality Monitor",
        category: "Hardware & IoT",
        course: "Annual Science & Tech Fair",
        image: "https://placehold.co/800x500/0284c7/ffffff?text=IoT+Project+Details",
        description: "Constructed an IoT sensor node using microcontrollers to measure temperature, humidity, and airborne particulate matter across campus study areas. Microcontroller logs metrics to an online MQTT dashboard for monitoring.",
        tags: ["C++", "Arduino", "IoT", "MQTT Protocol"]
    }
];

const modal = document.getElementById('project-modal');

function openProjectModal(index) {
    const data = projectData[index];
    if (!data || !modal) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-course').textContent = data.course;
    document.getElementById('modal-description').textContent = data.description;
    document.getElementById('modal-image').src = data.image;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside box or pressing ESC
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

// ==========================================================================
// 6. CONTACT FORM SIMULATION
// ==========================================================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            formSuccess.classList.remove('hidden');
            contactForm.reset();

            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }, 1000);
    });
}

// ==========================================================================
// 7. INITIALIZATION ON LOAD
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    initTheme();
    setTimeout(typeEffect, 500);
});
