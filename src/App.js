const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const connectionMongo = require('./database/connectionMongo');

const firebaseApp = require('./firebase');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
}));

// Configura las rutas de la API
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});