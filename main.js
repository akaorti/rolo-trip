// DATOS DE LAS EXPERIENCIAS (ESPAÑOL E INGLÉS)
const experiencesData = [
    {
        id: 1,
        title: {
            es: "Recorrido por La Candelaria Grafiti",
            en: "La Candelaria Street Art Tour"
        },
        category: "cultura",
        badge: { es: "Arte Urbano", en: "Street Art" },
        desc: {
            es: "Camina por el centro histórico y descubre la historia detrás del arte mural bogotano.",
            en: "Walk through the historic center and discover the story behind Bogota's mural art."
        },
        location: { es: "La Candelaria, Bogotá", en: "La Candelaria, Bogota" },
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: {
            es: "Ascenso al Cerro de Monserrate",
            en: "Monserrate Hill Hike & Cable Car"
        },
        category: "naturaleza",
        badge: { es: "Naturaleza", en: "Nature" },
        desc: {
            es: "Disfruta de la mejor vista panorámica de la ciudad a más de 3.100 metros de altura.",
            en: "Enjoy the best panoramic view of the city at over 3,100 meters above sea level."
        },
        location: { es: "Cerro de Monserrate", en: "Monserrate Hill" },
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: {
            es: "Cata de Café Especial Colombiano",
            en: "Colombian Specialty Coffee Tasting"
        },
        category: "gastronomia",
        badge: { es: "Gastronomía", en: "Gastronomy" },
        desc: {
            es: "Aprende a diferenciar notas, perfiles y métodos de preparación de café de origen.",
            en: "Learn to distinguish notes, profiles, and brewing methods of single-origin coffee."
        },
        location: { es: "Chapinero Alto, Bogotá", en: "Chapinero Alto, Bogota" },
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
    }
];

// TEXTOS DE LA INTERFAZ
const i18n = {
    es: {
        navExp: "Experiencias",
        navAbout: "Acerca de",
        heroTitle: "Explora Bogotá como un local",
        heroSubtitle: "Descubre las mejores experiencias urbanas, cultura, gastronomía y naturaleza en la capital.",
        filterAll: "Todos",
        filterCultura: "Cultura",
        filterGastronomia: "Gastronomía",
        filterNaturaleza: "Naturaleza"
    },
    en: {
        navExp: "Experiences",
        navAbout: "About Us",
        heroTitle: "Explore Bogota Like a Local",
        heroSubtitle: "Discover the best urban experiences, culture, gastronomy, and nature in the capital.",
        filterAll: "All",
        filterCultura: "Culture",
        filterGastronomia: "Gastronomy",
        filterNaturaleza: "Nature"
    }
};

let currentLanguage = 'es';
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderExperiences();
    setupFilters();
});

// DESPLEGABLE DE IDIOMA
window.toggleLangDropdown = function(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
};

window.selectLanguage = function(lang, code, event) {
    if (event) event.stopPropagation();

    currentLanguage = lang;

    // Actualizar texto y bandera en el botón principal
    document.getElementById('current-lang-code').innerText = code;
    const flagSvg = document.getElementById('current-flag');
    
    if (lang === 'es') {
        flagSvg.innerHTML = `
            <path fill="#ffda44" d="M0 0h640v240H0z"/>
            <path fill="#003087" d="M0 240h640v120H0z"/>
            <path fill="#d80027" d="M0 360h640v120H0z"/>
        `;
    } else {
        flagSvg.innerHTML = `
            <path fill="#00247d" d="M0 0h640v480H0z"/>
            <path fill="#fff" d="m67 0 253 189L573 0h67v50L387 240l253 190v50h-67L320 291 67 480H0v-50l253-190L0 50V0h67z"/>
            <path fill="#cf142b" d="M277 0v480h86V0h-86zM0 197v86h640v-86H0z"/>
        `;
    }

    // Marcar activo en el menú
    document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');

    // Cerrar menú
    document.getElementById('lang-dropdown').classList.remove('show');

    // Actualizar textos y tarjetas
    updateInterfaceTexts();
    renderExperiences();
};

// Cerrar si hacen clic fuera
document.addEventListener('click', (e) => {
    const selector = document.querySelector('.lang-selector');
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown && selector && !selector.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// ACTUALIZAR TEXTOS
function updateInterfaceTexts() {
    const t = i18n[currentLanguage];
    document.getElementById('nav-exp').innerText = t.navExp;
    document.getElementById('nav-about').innerText = t.navAbout;
    document.getElementById('hero-title').innerText = t.heroTitle;
    document.getElementById('hero-subtitle').innerText = t.heroSubtitle;
    document.getElementById('filter-all').innerText = t.filterAll;
    document.getElementById('filter-cultura').innerText = t.filterCultura;
    document.getElementById('filter-gastronomia').innerText = t.filterGastronomia;
    document.getElementById('filter-naturaleza').innerText = t.filterNaturaleza;
}

// RENDERIZADO DE TARJETAS
function renderExperiences() {
    const grid = document.getElementById('experiences');
    if (!grid) return;

    const filtered = experiencesData.filter(exp => activeFilter === 'all' || exp.category === activeFilter);
    grid.innerHTML = '';

    filtered.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${exp.image}" alt="${exp.title[currentLanguage]}">
                <span class="badge">${exp.badge[currentLanguage]}</span>
            </div>
            <div class="card-body">
                <h3>${exp.title[currentLanguage]}</h3>
                <p>${exp.desc[currentLanguage]}</p>
                <div class="card-location">📍 ${exp.location[currentLanguage]}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// FILTROS DE CATEGORÍA
function setupFilters() {
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeFilter = e.target.getAttribute('data-filter');
            renderExperiences();
        });
    });
}

window.filterHeroCards = function(tabName, event) {
    if (event) event.stopPropagation();

    // Cambiar estado activo en las pestañas
    document.querySelectorAll('.carousel-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Filtrar/Mostrar tarjetas correspondientes
    const cards = document.querySelectorAll('#hero-cards-slider .hero-card:not(.hero-card-cta)');
    cards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (categories && categories.includes(tabName)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};