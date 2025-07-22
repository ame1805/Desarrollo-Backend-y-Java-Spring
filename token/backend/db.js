// db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Alessandro18',
  database: 'prueba_tk',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

