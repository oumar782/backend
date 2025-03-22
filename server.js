require('dotenv').config();  // Assurez-vous d'inclure cette ligne pour charger les variables d'environnement
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./composant/authentification.js');
const creneauxRoutes = require('./composant/crenaux.js');
const { Pool } = require('pg');  // Importer Pool de pg pour gérer la connexion PostgreSQL

const app = express();
const port = 8000;


// Middleware for parsing form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({}));

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
    res.json(results.rows);  // PostgreSQL retourne les résultats avec un champ `.rows`
  });
});

// Route for manager
app.get('/gestionnaire', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestionnaire.html'));
});

// Add creneaux route
app.post('/ajoutcreneaux', (req, res) => {
  const { 
    creneauDate, 
    creneauHeureDebut, 
    creneauHeureFin, 
    creneauTypeTerrain, 
    creneauNomTerrain, 
    creneauSurface, 
    creneauStatut 
  } = req.body;

  // Vérification des champs requis
  if (!creneauDate || !creneauHeureDebut || !creneauHeureFin || !creneauTypeTerrain || 
      !creneauNomTerrain || !creneauSurface || !creneauStatut) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
  }

  const sql = `INSERT INTO creneaux 
      (datecreneaux, heure, heurefin, typeTerrain, nomterrain, SurfaceTerrains, statut) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`;

  db.query(sql, 
    [creneauDate, creneauHeureDebut, creneauHeureFin, creneauTypeTerrain, 
     creneauNomTerrain, creneauSurface, creneauStatut], 
    (err, result) => {
      if (err) {
        console.error('Erreur SQL:', err);
        return res.status(500).json({ 
            success: false, 
            message: `Erreur serveur interne: ${err.message}` 
        });
      }
      res.status(201).json({ 
          success: true, 
          message: 'Créneau ajouté avec succès.', 
          id: result.rows[0].id 
      });
  });
});

// Get all reservations
app.get('/listereservation', (req, res) => {
  const sql = 'SELECT * FROM reservations';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('SQL Error:', err.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    res.json(results.rows);  // PostgreSQL retourne les résultats avec un champ `.rows`
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
