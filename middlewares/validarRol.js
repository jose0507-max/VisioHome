const validarRol = (...tipoPermitido) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    try {
      if (!rol) {
        return res.status(401).json({ msg: "No hay rol" });
      }

      if (
        !tipoPermitido.map((r) => r.toLowerCase()).includes(rol.toLowerCase())
      ) {
        return res
          .status(403)
          .json({
            msg: `Acceso denegado, debes ser ${tipoPermitido.join(", ")}`,
          });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({ msg: "Error al validar el rol" });
    }
  };
};
