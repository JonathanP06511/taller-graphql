const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const GraphQLServer = require('./server/graphqlServer');

const app = express();
const graphqlServer = new GraphQLServer();

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'ui')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

// Endpoint para manejar la solicitud GraphQL
app.post('/graphql', async (req, res) => {
    const { query, variables } = req.body;
    try {
        const data = await graphqlServer.fetchData(query, variables);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Puerto dinámico para Heroku o puerto 3000 para entorno local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

