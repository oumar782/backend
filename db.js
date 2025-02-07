const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // Change si nécessaire
  user: 'root',      // Remplace par ton utilisateur MySQL
  password: 'root',      // Mets ton mot de passe ici
  database: 'FootSpaceReserve' // Mets le bon nom de base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
