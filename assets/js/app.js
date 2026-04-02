document.addEventListener('DOMContentLoaded', () => {
    loadPartials();
});

async function loadPartials() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    try {
        // RUTAS ACTUALIZADAS
        const [headerRes, footerRes] = await Promise.all([
            fetch('templates/header-template.html'),
            fetch('templates/footer-template.html')
        ]);

        const headerHTML = await headerRes.text();
        const footerHTML = await footerRes.text();

        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

        setupEventListeners();
        activateBottomNav();

    } catch (error) {
        console.error('Error al cargar las plantillas (header/footer):', error);
    }
}

function setupEventListeners() {
    // --- LÓGICA DEL MODO OSCURO ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            if(themeToggleBtnMobile) themeToggleBtnMobile.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            if(themeToggleBtnMobile) themeToggleBtnMobile.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    
    // --- LÓGICA DEL MENÚ MÓVIL (OFF-CANVAS) ---
    const mobileMenuToggle = document.querySelector('.nav-mobile-toggle');
    const mobileMenu = document.getElementById('nav-mobile');
    const navCloseBtn = document.getElementById('nav-close-btn');
    const navOverlay = document.getElementById('nav-overlay');

    function openMenu() {
        if (mobileMenu) mobileMenu.classList.add('open');
        if (navOverlay) navOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMenu);
    if (navCloseBtn) navCloseBtn.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    if (themeToggleBtnMobile) {
        themeToggleBtnMobile.addEventListener('click', () => {
            toggleTheme();
        });
    }

    // --- LÓGICA DE BÚSQUEDA ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchFormMobile = document.getElementById('search-form-mobile');
    const searchInputMobile = document.getElementById('search-input-mobile');

    function handleSearch(query) {
        if (query) {
            // Las rutas de página siguen siendo relativas a la raíz
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSearch(searchInput.value.trim());
        });
    }
    if (searchFormMobile) {
        searchFormMobile.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSearch(searchInputMobile.value.trim());
            closeMenu();
        });
    }
}

function activateBottomNav() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;
    const activeLink = document.getElementById(`nav-${currentPage}`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}