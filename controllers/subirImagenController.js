const path = require("path");
const { getConnection, sql } = require("../services/dbConnection");

const subirImagen = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No se subió la imegen" });
  }

  const urlImagen = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("url", sql.VarChar, urlImagen)
      .input("nombreArchivo", sql.VarChar, req.file.filename)
      .query(`INSERT INTO imagenes (NombreArchivo, Url)
      VALUES (@nombreArchivo, @url)
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(500).json({ error: "Error al guardar la imagen" });
    }

    res.json({
      mensaje: "Imagen subida y guardada en la base de datos",
      nombreArchivo: req.file.filename,
      url: urlImagen,
    });
  } catch (error) {
    console.error("Error al guardar en SQL Server:", error);
    res
      .status(500)
      .json({
        error: "Error del servidor al guardar la imagen en la base de datos",
      });
  }
};

module.exports = subirImagen;
