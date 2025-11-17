document.addEventListener('DOMContentLoaded', () => {

    const titleEl = document.getElementById('game-title');
    const imageEl = document.getElementById('game-image');
    const dateEl = document.getElementById('game-date');
    const descriptionEl = document.getElementById('game-description');
    const downloadLinkEl = document.getElementById('game-download-link');
    
    // --- NUEVOS ELEMENTOS ---
    const versionEl = document.getElementById('game-version');
    const categoryEl = document.getElementById('game-category');
    const galleryEl = document.getElementById('screenshots-gallery');

    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('id');

    if (!gameId) {
        titleEl.textContent = 'Error: Juego no encontrado';
        return;
    }

    fetch('data/search-index.json')
        .then(response => response.json())
        .then(data => {
            
            const game = data.find(item => item.id === gameId);
            
            if (game) {
                // Rellenar la información principal
                document.title = `${game.title} - GameHub`;
                titleEl.textContent = game.title;
                imageEl.src = game.image;
                imageEl.alt = game.title;
                dateEl.textContent = `Actualizado: ${game.date}`;
                descriptionEl.textContent = game.description;

                // Rellenar la info meta
                versionEl.textContent = game.version || 'N/A';
                categoryEl.textContent = game.category || 'N/A';

                // Rellenar el enlace de descarga (si lo tuvieras en el JSON)
                // if (game.download_url) downloadLinkEl.href = game.download_url;

                // --- NUEVO: Construir la Galería ---
                if (game.screenshots && game.screenshots.length > 0) {
                    game.screenshots.forEach(url => {
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = `Captura de ${game.title}`;
                        img.loading = 'lazy';
                        
                        // Opcional: Clic en la miniatura cambia la imagen principal
                        img.addEventListener('click', () => {
                            imageEl.src = url;
                            window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al inicio
                        });
                        
                        galleryEl.appendChild(img);
                    });
                } else {
                    // Oculta la sección de galería si no hay capturas
                    if (galleryEl.parentElement) {
                        galleryEl.parentElement.style.display = 'none';
                    }
                }

            } else {
                // ... (código de error) ...
            }
        })
        .catch(error => {
            // ... (código de error) ...
        });
});