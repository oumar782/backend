require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Utilise la bonne variable d’environnement
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Connexion réussie à PostgreSQL !");
    client.release();
  } catch (err) {
    console.error("❌ Erreur de connexion :", err);
  }
}

testConnection();

module.exports = pool;
