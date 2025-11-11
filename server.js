const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


dotenv.config();

// Crear la instancia de la aplicación
const app = express(); 

// --- 2. MIDDLEWARES ---
// HABILITAR CORS (antes de las rutas)
app.use(
  cors({
    origin: "http://localhost:5173", // Tu frontend de Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);


// Permitir que Express entienda JSON
app.use(express.json());

// --- 3. RUTAS ---

app.use('/api/juegos', gameRoutes); // Antes: /api/games
app.use('/api/reseñas', reviewRoutes); // Antes: /api/reviews

// CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB correctamente'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// INICIAR SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));