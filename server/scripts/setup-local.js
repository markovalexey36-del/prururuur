import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const schemaPath = path.join(__dirname, '..', 'sql', 'schema.mysql57.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
  charset: 'utf8mb4',
});

try {
  await connection.query(schemaSql);
  await connection.execute(
    `INSERT INTO admins (id, login, password_hash, is_active)
     VALUES (?, ?, ?, 1)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), is_active = VALUES(is_active)`,
    ['11111111-1111-1111-1111-111111111111', 'admin', '$2a$12$lDyDMBS9Y4DSXsuoX8GcfuqAmeL.0lu9O4EXqd6NUetFsLUDGAaze']
  );
  console.log('Database schema applied and admin user prepared.');
} finally {
  await connection.end();
}
