const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
    encrypt: process.env.DB_ENCRYPT === 'true',
  },
};
let pool;
console.log('config -> ', config);
const getConnection = async () => {
  try {
    if (!pool) {
      pool = await new sql.ConnectionPool(config).connect();
      console.log('conectado a sql Server');
    }
    return pool;
  } catch (error) {
    console.error("Error al conectar a la BD ", error);
    throw error;
  }
};

module.exports = {getConnection, sql};
