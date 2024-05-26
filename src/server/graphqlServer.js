const fetch = require('node-fetch');

class GraphQLServer {
    constructor() {
        this.apiUrl = 'https://graphql-pokeapi.graphcdn.app/';
    }

    async fetchData(query, variables) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
}

module.exports = GraphQLServer;
