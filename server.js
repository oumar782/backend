const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./composant/authentification.js');
const creneauxRoutes = require('./composant/crenaux.js');
const db = require('./db.js');

const app = express();
const port = process.env.PORT || 8000;

// Middleware for parsing form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for administrator
app.get('/administrateur.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Use creneaux routes
app.use('/api/creneaux', creneauxRoutes);
app.use('/auth', authRoutes);
// Get all creneaux
app.get('/creneaux', (req, res) => {
  const sql = 'SELECT * FROM creneaux';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('SQL Error:', err.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    res.json(results);
  });
});

// Route for manager
app.get('/gestionnaire', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestionnaire.html'));
});


app.post('/ajoutcreneaux', (req, res) => {
  const { creneauDate, creneauHeureDebut, creneauHeureFin, creneauTypeTerrain, creneauNomTerrain, creneauStatut } = req.body;

  if (!creneauDate || !creneauHeureDebut || !creneauHeureFin || !creneauTypeTerrain || !creneauNomTerrain || !creneauStatut) {
      return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
  }

  const sql = 'INSERT INTO creneaux (datecreneaux, heure, heurefin, typeTerrain, nomterrain, statut) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [creneauDate, creneauHeureDebut, creneauHeureFin, creneauTypeTerrain, creneauNomTerrain, creneauStatut], (err, result) => {
      if (err) {
          console.error('Erreur SQL:', err.message);
          return res.status(500).json({ success: false, message: `Erreur serveur interne: ${err.message}` });
      }
      res.status(201).json({ success: true, message: 'Créneau ajouté avec succès.', id: result.insertId });
  });
});
app.put('/creneaux/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
      // Mettre à jour le créneau dans la base de données
      const result = await db.query('UPDATE creneaux SET ? WHERE idcreneaux = ?', [updatedData, id]);
      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Créneau non trouvé" });
      }
      res.json({ message: "Créneau modifié avec succès" });
  } catch (error) {
      res.status(500).json({ error: "Erreur lors de la modification du créneau" });
  }
});

app.delete('/creneaux/:id', (req, res) => {
  const idcreneaux = parseInt(req.params.id, 10);

  if (isNaN(idcreneaux)) {
      console.error("ID invalide reçu :", req.params.id);
      return res.status(400).json({ error: "ID invalide" });
  }

  console.log("Tentative de suppression du créneau avec ID :", idcreneaux);

  const sql = 'DELETE FROM creneaux WHERE idcreneaux = ?';

  db.query(sql, [idcreneaux], (err, result) => {
      if (err) {
          console.error("Erreur SQL lors de la suppression :", err); // Debugging
          return res.status(500).json({ error: "Erreur lors de la suppression du créneau.", details: err.message });
      }

      if (result.affectedRows === 0) {
          console.warn("Aucun créneau trouvé avec cet ID :", idcreneaux);
          return res.status(404).json({ error: "Créneau non trouvé !" });
      }

      console.log("Créneau supprimé avec succès :", idcreneaux);
      res.json({ message: "Créneau supprimé avec succès !" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});