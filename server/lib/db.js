import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const requiredEnv = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4_unicode_ci',
  namedPlaceholders: true,
});

async function ensureUtf8mb4Session(connection) {
  if (connection.__utf8mb4Ready) {
    return;
  }

  await connection.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
  connection.__utf8mb4Ready = true;
}

export async function query(sql, params = {}) {
  const connection = await pool.getConnection();
  try {
    await ensureUtf8mb4Session(connection);
    const [rows] = await connection.execute(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

export async function withTransaction(callback) {
  const connection = await pool.getConnection();
  try {
    await ensureUtf8mb4Session(connection);
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
