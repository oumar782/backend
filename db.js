require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

const { Pool } = require('pg'); // Charger le module pg pour la connexion PostgreSQL

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Utiliser l'URL de connexion de la base de données
  ssl: {
    rejectUnauthorized: false, // Nécessaire pour la connexion sécurisée avec Neon
  },
});

// Vous pouvez tester la connexion en exécutant une simple requête
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); // Exemple de requête simple pour tester la connexion
    console.log('Connexion réussie :', res.rows[0]);
  } catch (err) {
    console.error('Erreur de connexion :', err);
  }
}

testConnection();

module.exports = pool; // Exporter la connexion pour l'utiliser ailleurs dans votre projet
