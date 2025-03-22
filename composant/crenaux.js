const express = require('express');
const db = require('../db.js');

const router = express.Router();

// 📌 Route pour récupérer les créneaux disponibles
router.get('/creneaux', (req, res) => {
  let { date, terrainType, surface } = req.query;

  // Vérification des paramètres requis
  if (!date || !terrainType || !surface) {
    return res.status(400).json({ message: 'Date, type de terrain et surface sont requises.' });
  }

  // Validation des formats
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  terrainType = terrainType.trim().toLowerCase();
  const validTerrainType = ['normal', 'synthetique'].includes(terrainType);
  const validSurface = ['7X7', '9X9', '11X11'].includes(surface);

  if (!validDate || !validTerrainType || !validSurface) {
    return res.status(400).json({ message: 'Format invalide pour la date, le type de terrain ou la surface.' });
  }

  // Requête SQL sécurisée
  const sql = `SELECT * FROM creneaux WHERE typeTerrain = ? AND datecreneaux = ? AND SurfaceTerrains = ?`;

  db.query(sql, [terrainType, date, surface], (err, results) => {
    if (err) {
      console.error('❌ Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

module.exports = router;
