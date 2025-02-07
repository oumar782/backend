const express = require('express');
const db = require('../db.js');

const router = express.Router();

// 📌 Route pour récupérer les créneaux disponibles
router.get('/creneaux', (req, res) => {
  const { date, terrainType } = req.query;

  // Vérification des paramètres de requête
  if (!date || !terrainType) {
    return res.status(400).json({ message: 'Date et type de terrain requis.' });
  }

  // Validation du format de la date et du type de terrain
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date); // Exemple de validation de date au format YYYY-MM-DD
  const validTerrainType = typeof terrainType === 'string' && terrainType.trim() !== '';

  if (!validDate || !validTerrainType) {
    return res.status(400).json({ message: 'Format de date ou type de terrain invalide.' });
  }

  const sql = `SELECT * FROM creneaux WHERE typeTerrain = ? AND dateCreneaux = ?`;

  db.query(sql, [terrainType, date], (err, results) => {
    if (err) {
      console.error('❌ Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

module.exports = router;