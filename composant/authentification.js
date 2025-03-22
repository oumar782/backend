const express = require('express');
const router = express.Router();
const db = require('../db.js');  // Assure-toi que le chemin vers db.js est correct

// Route pour gérer la soumission du formulaire de connexion
router.post('/login', (req, res) => {
  const { nom, email, mdp, typeuser } = req.body;

  // Requête SQL pour récupérer l'utilisateur en fonction des données soumises
  const sql = 'SELECT * FROM utilisateurs WHERE nom = $1 AND email = $2 AND mdp = $3 AND typeuser = $4';

  // Utilisation de db.query pour exécuter la requête SQL
  db.query(sql, [nom, email, mdp, typeuser])
    .then((result) => {
      if (result.rows.length > 0) {
        const utilisateur = result.rows[0];
        const utilisateurRole = utilisateur.typeuser;

        switch (utilisateurRole) {
          case 'Administrateur':
            return res.status(200).json({
              success: true,
              message: 'Login successful',
              redirectTo: '/administrateur.html'
            });

          case 'Gestionnaire':
            return res.status(200).json({
              success: true,
              message: 'Login successful',
              redirectTo: '/gestionnaire.html'
            });

          default:
            return res.status(403).json({ message: 'Unrecognized role or insufficient authorization' });
        }
      } else {
        return res.status(401).json({ message: 'Nom ou mot de passe incorrect, veuillez réessayer' });
      }
    })
    .catch((err) => {
      console.error('Error executing query', err.message);
      return res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
