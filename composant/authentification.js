const express = require('express');
const router = express.Router();
const db = require('../db.js');  // Ensure the correct path to your db.js file

// Route to handle login form submission
router.post('/login', (req, res) => {
  const { nom, email, mdp, typeuser } = req.body;

  const sql = 'SELECT * FROM utilisateurs WHERE nom = ? AND email = ? AND mdp = ? AND typeuser = ?';

  // Use db.query to execute the query
  db.query(sql, [nom, email, mdp, typeuser], (err, results) => {
    if (err) {
      console.error('SQL query error:', err.message);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      const utilisateur = results[0];
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
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

module.exports = router;