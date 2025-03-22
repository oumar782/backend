require('dotenv').config();  // Charge les variables d'environnement depuis le fichier .env

const { Pool } = require('pg');

// Utilisez DATABASE_URL dans votre configuration de Pool pour se connecter à PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Connexion via l'URL de Neon
  ssl: {
    rejectUnauthorized: false, // Requis pour la connexion sécurisée à Neon
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à PostgreSQL:', err.message);
    return;
  }
  console.log('Connexion réussie à PostgreSQL ✅');
  release(); // Libère la connexion après l'utilisation
});

module.exports = pool;  // Exporter l'instance de la connexion Pool
