const { getConnection, sql } = require("../services/dbConnection");
const hashPassword = require("../services/hashPassword");

const modeloActualizarusuarios = async (id, nombre, password) => {
  const hashedPassword = hashPassword(password);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("password", sql.NVarChar, hashedPassword)
      .input('id', sql.Int, id)
      .query(
        "UPDATE usuarios SET nombre = @nombre, password = @password WHERE id = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return { ok: false, msg: "Error al actualizar" };
    }
    return { ok: true, msg: "Datos actualizados correctamente" };
  } catch (error) {
    return { 
        ok: false, 
        msg: "Error al actualizar", 
        failed: error.stack};
  }
};

module.exports = modeloActualizarusuarios;