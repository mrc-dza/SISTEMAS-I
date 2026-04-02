document.addEventListener('DOMContentLoaded', () => {
    
    const adminForm = document.getElementById('admin-form');
    if (!adminForm) return;

    const outputJson = document.getElementById('output-json');

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('admin-title').value;
        const image = document.getElementById('admin-image').value;
        const date = document.getElementById('admin-date').value;
        const category = document.getElementById('admin-category').value;
        const page = document.getElementById('admin-page').value;
        const id = document.getElementById('admin-id').value;
        const description = document.getElementById('admin-description').value;
        
        // --- NUEVOS CAMPOS ---
        const version = document.getElementById('admin-version').value;
        const screenshotsRaw = document.getElementById('admin-screenshots').value;
        
        // Convierte el texto de las capturas en un array de URLs
        const screenshots = screenshotsRaw.split('\n').filter(url => url.trim() !== '');

        const tags = [];
        if (document.getElementById('tag-popular').checked) {
            tags.push("popular");
        }
        if (document.getElementById('tag-recent').checked) {
            tags.push("recent");
        }

        const gameData = {
            id,
            title,
            image,
            version, // <-- AÑADIDO
            date,
            page,
            description,
            category,
            tags,
            screenshots // <-- AÑADIDO
        };

        const jsonCode = JSON.stringify(gameData, null, 4) + ',';

        outputJson.value = jsonCode.trim();
    });
});