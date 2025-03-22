require('dotenv').config();  // Assurez-vous d'inclure cette ligne au début pour charger les variables d'environnement

const { Pool } = require('pg');

const db = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PWD,
  database: process.env.DBNAME,
  port: 5432, // Assurez-vous d'ajuster le port si nécessaire
});

db.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à PostgreSQL:', err.message);
    return;
  }
  console.log('Connexion réussie à PostgreSQL ✅');
  release();
});

module.exports = db;
