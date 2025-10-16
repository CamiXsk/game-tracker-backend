const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config();

const app = express();

// ✅ HABILITAR CORS (debe ir antes de las rutas)
app.use(cors({
  origin: 'http://localhost:5173', // Tu frontend local
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Para leer JSON del body

// ✅ Rutas
app.use('/api/games', gameRoutes);

// ✅ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB correctamente'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// ✅ Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
