const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Utilisation de la variable d'environnement
  user: process.env.DB_USER,  // Utilisateur de la base de données (doit aussi être dans les variables d'environnement)
  password: process.env.DB_PASSWORD,  // Mot de passe de la base de données
  database: process.env.DB_NAME   // Nom de la base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
