const express = require('express');
const router = express.Router();
const Game = require('../models/gameModel');

// Obtener todos los juegos
router.get('/', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// Agregar un nuevo juego
router.post('/', async (req, res) => {
  const newGame = new Game(req.body);
  await newGame.save();
  res.json({ message: 'Juego agregado correctamente', newGame });
});

module.exports = router;
