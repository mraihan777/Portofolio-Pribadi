// Admin Panel JavaScript

// Default password
const DEFAULT_PASSWORD = 'admin123';

// Check if logged in
window.addEventListener('load', () => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminPanel();
    }
    loadAllData();

    // Add Enter key support for login
    const passwordInput = document.getElementById('adminPassword');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    }
});

// Login
function login() {
    const password = document.getElementById('adminPassword').value;
    const savedPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;

    if (password === savedPassword) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
    } else {
        alert('❌ Password salah!');
    }
}

// Logout
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
}

// Show section
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));

    // Show selected section
    document.getElementById(section + 'Section').classList.add('active');
    event.target.classList.add('active');
}

// Show success message
function showSuccess() {
    const msg = document.getElementById('successMessage');
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 3000);
}

// Load all data
function loadAllData() {
    loadHeroData();
    loadAboutData();
    loadSkills();
    loadProjects();
}

// ===== HERO SECTION =====
function loadHeroData() {
    const hero = JSON.parse(localStorage.getItem('heroData')) || {
        name: 'Muhammad Raihan',
        title: 'Web Developer Front End & Designer',
        description: 'Saya menciptakan pengalaman web yang indah dan fungsional dengan fokus pada detail dan kualitas. Mari wujudkan proyek digital Anda menjadi kenyataan.'
    };

    document.getElementById('heroName').value = hero.name;
    document.getElementById('heroTitle').value = hero.title;
    document.getElementById('heroDescription').value = hero.description;
}

function saveHero(e) {
    e.preventDefault();

    const hero = {
        name: document.getElementById('heroName').value,
        title: document.getElementById('heroTitle').value,
        description: document.getElementById('heroDescription').value
    };

    localStorage.setItem('heroData', JSON.stringify(hero));
    showSuccess();
}

// ===== ABOUT SECTION =====
function loadAboutData() {
    const about = JSON.parse(localStorage.getItem('aboutData')) || {
        title: 'Passionate Web Developer',
        para1: 'Saya adalah seorang web developer dengan pengalaman dalam menciptakan aplikasi web yang modern dan responsif. Dengan keahlian dalam berbagai teknologi web, saya siap membantu mewujudkan visi digital Anda.',
        para2: 'Saya percaya bahwa desain yang baik tidak hanya tentang estetika, tetapi juga tentang fungsionalitas dan pengalaman pengguna yang optimal. Setiap proyek adalah kesempatan untuk belajar dan berkembang.',
        para3: 'Selain coding, saya juga menikmati kolaborasi dengan tim, berbagi pengetahuan, dan terus mengikuti perkembangan teknologi terbaru di industri web development.'
    };

    document.getElementById('aboutTitle').value = about.title;
    document.getElementById('aboutPara1').value = about.para1;
    document.getElementById('aboutPara2').value = about.para2;
    document.getElementById('aboutPara3').value = about.para3;
}

function saveAbout(e) {
    e.preventDefault();

    const about = {
        title: document.getElementById('aboutTitle').value,
        para1: document.getElementById('aboutPara1').value,
        para2: document.getElementById('aboutPara2').value,
        para3: document.getElementById('aboutPara3').value
    };

    localStorage.setItem('aboutData', JSON.stringify(about));
    showSuccess();
}

// ===== SKILLS SECTION =====
function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skillsData')) || [
        { icon: '💻', name: 'Web Development', description: 'Membuat website responsif dan interaktif menggunakan HTML, CSS, JavaScript.' },
        { icon: '🎨', name: 'UI/UX Design', description: 'Mendesain antarmuka pengguna yang intuitif dan menarik dengan fokus pada pengalaman pengguna yang optimal.' },
        { icon: '📱', name: 'Responsive Design', description: 'Memastikan website terlihat sempurna di semua perangkat, dari smartphone hingga desktop.' },
        { icon: '⚡', name: 'Performance', description: 'Optimisasi kecepatan dan performa website untuk memberikan pengalaman loading yang cepat.' },
        { icon: '🚀', name: 'Deployment', description: 'Mengelola deployment dan hosting aplikasi web menggunakan platform seperti Vercel, Netlify, dan AWS.' }
    ];

    localStorage.setItem('skillsData', JSON.stringify(skills));
    displaySkills();
}

function displaySkills() {
    const skills = JSON.parse(localStorage.getItem('skillsData')) || [];
    const container = document.getElementById('skillsList');

    container.innerHTML = skills.map((skill, index) => `
        <div class="skill-item">
            <div>
                <strong>${skill.icon} ${skill.name}</strong>
                <p style="margin-top: 0.5rem; color: var(--text-secondary);">${skill.description}</p>
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteSkill(${index})">🗑️ Hapus</button>
            </div>
        </div>
    `).join('');
}

function addSkill(e) {
    e.preventDefault();

    const skills = JSON.parse(localStorage.getItem('skillsData')) || [];
    const newSkill = {
        icon: document.getElementById('skillIcon').value,
        name: document.getElementById('skillName').value,
        description: document.getElementById('skillDesc').value
    };

    skills.push(newSkill);
    localStorage.setItem('skillsData', JSON.stringify(skills));

    // Reset form
    e.target.reset();
    displaySkills();
    showSuccess();
}

function deleteSkill(index) {
    if (confirm('Yakin ingin menghapus skill ini?')) {
        const skills = JSON.parse(localStorage.getItem('skillsData')) || [];
        skills.splice(index, 1);
        localStorage.setItem('skillsData', JSON.stringify(skills));
        displaySkills();
        showSuccess();
    }
}

// ===== PROJECTS SECTION =====
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projectsData')) || [
        {
            name: 'E-Commerce Platform',
            description: 'Platform e-commerce modern dengan fitur keranjang belanja, pembayaran online, dan dashboard admin yang lengkap.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            demo: 'https://rahata-store.vercel.app/',
            github: 'https://github.com/mraihan777/Rahata-Store.git'
        },
        {
            name: 'Bank Sampah',
            description: 'Bank Sampah adalah platform yang dirancang untuk memudahkan pengguna dalam mengelola sampah mereka.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            demo: 'https://bank-sampah-kappa.vercel.app/',
            github: 'https://github.com/mraihan777/Bank-Sampah.git'
        },
        {
            name: 'Portfolio Website',
            description: 'Website portofolio dengan desain modern, animasi smooth, dan dark mode untuk pengalaman pengguna yang premium.',
            tags: ['HTML', 'CSS', 'JavaScript'],
            demo: 'https://portofolio-pribadi-alpha.vercel.app/',
            github: 'https://github.com/mraihan777/Portofolio-Pribadi'
        }
    ];

    localStorage.setItem('projectsData', JSON.stringify(projects));
    displayProjects();
}

function displayProjects() {
    const projects = JSON.parse(localStorage.getItem('projectsData')) || [];
    const container = document.getElementById('projectsList');

    container.innerHTML = projects.map((project, index) => `
        <div class="project-item">
            <div>
                <strong>${project.name}</strong>
                <p style="margin-top: 0.5rem; color: var(--text-secondary);">${project.description}</p>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                    <strong>Tags:</strong> ${project.tags.join(', ')}
                </p>
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteProject(${index})">🗑️ Hapus</button>
            </div>
        </div>
    `).join('');
}

function addProject(e) {
    e.preventDefault();

    const projects = JSON.parse(localStorage.getItem('projectsData')) || [];
    const tags = document.getElementById('projectTags').value.split(',').map(t => t.trim());

    const newProject = {
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDesc').value,
        tags: tags,
        demo: document.getElementById('projectDemo').value,
        github: document.getElementById('projectGithub').value
    };

    projects.push(newProject);
    localStorage.setItem('projectsData', JSON.stringify(projects));

    // Reset form
    e.target.reset();
    displayProjects();
    showSuccess();
}

function deleteProject(index) {
    if (confirm('Yakin ingin menghapus proyek ini?')) {
        const projects = JSON.parse(localStorage.getItem('projectsData')) || [];
        projects.splice(index, 1);
        localStorage.setItem('projectsData', JSON.stringify(projects));
        displayProjects();
        showSuccess();
    }
}

// ===== SETTINGS =====
function changePassword(e) {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('❌ Password tidak cocok!');
        return;
    }

    if (newPassword.length < 6) {
        alert('❌ Password minimal 6 karakter!');
        return;
    }

    localStorage.setItem('adminPassword', newPassword);
    alert('✅ Password berhasil diubah!');
    e.target.reset();
}
