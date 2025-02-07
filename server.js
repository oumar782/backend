const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./composant/authentification.js');
const creneauxRoutes = require('./composant/crenaux.js');
const db = require('./db.js');
const cors = require('cors');
const app = express();
const port = 8000;

// Middleware pour analyser les données du formulaire et JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route pour l'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route pour administrateur
app.get('/administrateur.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.use('/api/creneaux', creneauxRoutes);

// Obtenir tous les créneaux
app.get('/creneaux', (req, res) => {
  const sql = 'SELECT * FROM creneaux';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('SQL Error:', err.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    res.json(results); // Send the creneaux data as JSON
  });
});

// Route pour gestionnaire
app.get('/gestionnaire.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestionnaire.html'));
});
// Utilisation des routes d'authentification
app.use('/auth', authRoutes);  // Appliquer directement le routeur ici

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});