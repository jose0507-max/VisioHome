const { getConnection, sql } = require("../services/dbConnection");

const getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM usuarios");

    const data = result.recordset;

    if (!data.length) {
      return res.status(404).json({ msg: "No hay usuarios en la bd" });
    }
    res.status(200).json({ msg: "Usuarios obtenidos con exito", data });
  } catch (error) {
    res.status(500).json({
      msg: "Error del Server",
      name: error.name,
      stack: error.stack
    });
  }
};

module.exports = getUsuarios;
