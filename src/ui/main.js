async function fetchGraphQLData() {
    const query = `query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          count
          next
          previous
          nextOffset
          prevOffset
          status
          message
          results {
            url
            name
            image
          }
        }
      }`;

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        const pokemonResults = data.data.pokemons.results;
        const resultsContainer = document.getElementById('results');

        // Limpiar resultados anteriores
        resultsContainer.innerHTML = '';

        // Iterar sobre cada resultado y crear elementos HTML para mostrar los nombres e imágenes
        pokemonResults.forEach(pokemon => {
            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');

            const pokemonName = document.createElement('h2');
            pokemonName.textContent = pokemon.name;

            const pokemonImage = document.createElement('img');
            pokemonImage.src = pokemon.image;

            pokemonDiv.appendChild(pokemonName);
            pokemonDiv.appendChild(pokemonImage);
            resultsContainer.appendChild(pokemonDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
window.onload = fetchGraphQLData;
