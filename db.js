const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env. 196.115.41.79,  // Utilisation de la variable d'environnement
  user: process.env.root,  // Utilisateur de la base de données (doit aussi être dans les variables d'environnement)
  password: process.env.root,  // Mot de passe de la base de données
  database: process.env.FootSpaceReserve   // Nom de la base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
