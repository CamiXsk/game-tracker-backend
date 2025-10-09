const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config();

const app = express();
app.use(express.json()); // Para poder leer JSON del body

// Ruta base
app.use('/api/games', gameRoutes);

// Conexión con MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB correctamente'))
  .catch(err => console.error('❌ Error al conectar:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
