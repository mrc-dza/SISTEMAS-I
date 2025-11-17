document.addEventListener('DOMContentLoaded', () => {
    
    // Función para crear el HTML de una tarjeta
    function buildCard(item) {
        return `
            <a href="juego.html?id=${item.id}">
                <article class="card" data-category="${item.category}">
                    
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    
                    <h3>${item.title}</h3>
                    <div class="rating">
                        </div>
                    <span>${item.date}</span>
                </article>
            </a>
        `;
    }

    // Función para cargar contenido en un contenedor
    function loadContent(filterFn, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return; 

        fetch('data/search-index.json')
            .then(response => response.json())
            .then(data => {
                const items = data.filter(filterFn);
                if (items.length === 0) {
                    container.innerHTML = "<p>No hay contenido disponible.</p>";
                    return;
                }
                container.innerHTML = items.map(buildCard).join('');
            })
            .catch(error => {
                console.error('Error al cargar contenido:', error);
                container.innerHTML = "<p>Error al cargar el contenido.</p>";
            });
    }

    // Identificar qué página estamos viendo
    const currentPage = document.body.dataset.page;

    // Cargar contenido basado en la página
    switch (currentPage) {
        case 'inicio':
            loadContent(item => item.tags.includes('recent'), 'recent-grid');
            loadContent(item => item.tags.includes('popular'), 'popular-grid');
            break;
        case 'juegos':
            loadContent(item => item.page === 'juegos.html', 'juegos-grid');
            break;
        case 'apps':
            loadContent(item => item.page === 'apps.html', 'apps-grid');
            break;
        case 'popular':
            loadContent(item => item.tags.includes('popular'), 'popular-grid');
            break;
    }

    // --- LÓGICA DE FILTROS ---
    setTimeout(() => {
        const filterContainer = document.querySelector('.filter-buttons');
        if (filterContainer) {
            const filterButtons = filterContainer.querySelectorAll('.filter-btn');
            // Busca el siguiente elemento hermano que sea .grid-container
            const gridContainer = filterContainer.nextElementSibling; 

            filterContainer.addEventListener('click', (e) => {
                const clickedButton = e.target.closest('.filter-btn');
                if (!clickedButton) return;

                filterButtons.forEach(btn => btn.classList.remove('active'));
                clickedButton.classList.add('active');

                const filter = clickedButton.getAttribute('data-filter');
                const cards = gridContainer.querySelectorAll('.grid-container > a');

                cards.forEach(cardLink => {
                    const card = cardLink.querySelector('.card');
                    if (!card) return;
                    
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        cardLink.style.display = 'block';
                    } else {
                        cardLink.style.display = 'none';
                    }
                });
            });
        }
    }, 500); // 500ms de retraso

});