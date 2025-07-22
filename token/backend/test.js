const mysql = import('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Alessandro18',
      database: 'prueba_tk'
    });

    console.log('Conexión MySQL exitosa');
    await connection.end();
  } catch (err) {
    console.error('Error de conexión:', err.message);
  }
}

testConnection();
