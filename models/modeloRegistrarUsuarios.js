const { getConnection, sql } = require("../services/dbConnection");
const hashPassword = require("../services/hashPassword");
const modeloRegistrarUsuarios = async (nombre, correo, password, rol) => {
  try {
    const pool = await getConnection();

    const existeUsuario = await pool
      .request()
      .input("correo", sql.NVarChar, correo)
      .query("SELECT * FROM usuarios WHERE correo = @correo");

    if (existeUsuario.recordset.length) {
      return { success: false, msg: "El correo ya existe" }; // ✅ Retorna estado
    }

    const hashedPassword = await hashPassword(password);

    const result = await pool
      .request()
      .input("nombre", sql.NVarChar, nombre)
      .input("correo", sql.NVarChar, correo)
      .input("password", sql.NVarChar, hashedPassword)
      .input("rol", sql.NVarChar, rol)
      .query(`INSERT INTO usuarios (nombre, correo, password, rol, activo) 
            VALUES (@nombre, @correo, @password, @rol, 1)`);

    return result;
  } catch (error) {
    return { success: false, msg: "Error al registrar el usuario"}; // ✅ No usar res aquí
  }
};

module.exports = modeloRegistrarUsuarios;
