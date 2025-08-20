const modeloRegistrarUsuarios = require("../models/modeloRegistrarUsuarios");

const registrarUsuario = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;

  try {
    const result = await modeloRegistrarUsuarios(nombre, correo, password, rol);

    if (!result.success) {
      return res.status(500).json(result.msg);
    }
    res.status(200).json("Usuario registrado correctamente");
  } catch (error) {
    res.status(500).json({ msg: "Error al insertar", error });
    console.log(error);
  }
};

module.exports = registrarUsuario;
