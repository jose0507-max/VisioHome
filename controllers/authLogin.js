const generarJWT = require("../helpers/generarJWT");
const bcrypt = require("bcrypt");
const { getConnection, sql } = require("../services/dbConnection");

const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const pool = await getConnection();
    const existeUsuario = await pool
      .request()
      .input("correo", sql.NVarChar, correo)
      .query("SELECT * FROM usuarios WHERE correo = @correo");

    const usuario = existeUsuario.recordset;
    if (usuario.length === 0) {
      return res.status(401).json({ msg: "El usuario no existe " });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario[0].password
    );

    if (!passwordValida) {
      return res.status(401).json({ msg: "Contraseña incorrecta " });
    }

    const payloadBase = {
      nombre: usuario[0].nombre,
      correo: usuario[0].correo,
      rol: usuario[0].rol,
      activo: usuario[0].activo,
    };
    const accessToken = await generarJWT(payloadBase, "access");
    const refreshToken = await generarJWT(payloadBase, "refresh");

    res.status(200).json({
      msg: "Tokens generados con exito",
      refreshToken: refreshToken,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error al generar los tokens ", 
      error: {
        stack: error.stack,
        name: error.name
      } });
      console.error(error);
  }
};

module.exports = login;
