document.addEventListener('DOMContentLoaded', () => {
    
    const searchTitle = document.getElementById('search-title');
    const resultsContainer = document.getElementById('results-container');
    
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    
    if (query) {
        searchTitle.textContent = `Resultados para: "${query}"`;
    } else {
        searchTitle.textContent = 'Por favor, introduce un término de búsqueda';
    }

    if (query) {
        fetch('data/search-index.json')
            .then(response => response.json())
            .then(data => {
                const results = data.filter(item => 
                    item.title.toLowerCase().includes(query.toLowerCase())
                );
                displayResults(results);
            })
            .catch(error => {
                console.error('Error al cargar el índice de búsqueda:', error);
                resultsContainer.innerHTML = '<p>Error al cargar resultados.</p>';
            });
    }

    function displayResults(results) {
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No se encontraron resultados para esta búsqueda.</p>';
            return;
        }
        
        resultsContainer.innerHTML = '';
        
        results.forEach(item => {
            const link = document.createElement('a');
            link.href = `juego.html?id=${item.id}`;
            
            link.innerHTML = `
                <article class="card">
                    
                    <img src="${item.image}" alt="${item.title}" loading="lazy">

                    <h3>${item.title}</h3>
                    <div class="rating">
                        </div>
                    <span>${item.date}</span>
                </article>
            `;
            resultsContainer.appendChild(link);
        });
    }
});