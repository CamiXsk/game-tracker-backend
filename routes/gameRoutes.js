const express = require('express');
const router = express.Router(); // organizar rutas
const Game = require('../models/gameModel');

// ✅ Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    //esperar a que encuentre el juego 
    res.json(games);
  } catch (err) {
    console.error("❌ Error al obtener juegos:", err.message);
    res.status(500).json({ message: err.message });
//decteta algun error y manda mensaje 
  }
});

// --- 2. CREAR UN NUEVO JUEGO ---

router.post('/', async (req, res) => {
  try {
    //analiza los datos q llegan en formato req.body
    console.log("📩 Datos recibidos del frontend:", req.body); // 🔍 Ver qué llega desde React

    const newGame = new Game(req.body);
    await newGame.save();

    console.log("✅ Juego guardado correctamente:", newGame);
    res.json(newGame);
  } catch (error) {
    console.error("❌ Error al crear juego:", error.message); // 🔍 Mostrar error exacto
    res.status(400).json({ message: error.message });
  }
});

// ✅ Eliminar un juego
router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    console.log(`🗑️ Juego eliminado con ID: ${req.params.id}`);
    res.json({ message: 'Juego eliminado correctamente' });
  } catch (err) {
    console.error("❌ Error al eliminar juego:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
