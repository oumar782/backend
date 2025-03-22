const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Assure-toi que la connexion DB est correcte

// Route pour le login
router.post('/login', (req, res) => {
  const { nom, email, mdp, typeuser } = req.body;

  // Requête SQL corrigée
  const sql = 'SELECT * FROM utilisateurs WHERE nom = $1 AND email = $2 AND mdp = $3 AND typeuser = $4';

  // Exécution de la requête avec db.query
  db.query(sql, [nom, email, mdp, typeuser])
    .then(result => {
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
    .catch(err => {
      console.error('Erreur SQL:', err.message);
      return res.status(500).json({ message: 'Une erreur interne est survenue.' });
    });
});

module.exports = router;
