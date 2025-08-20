const jwt = require("jsonwebtoken");
require("dotenv").config();

const verificarJWT = (tipoEsperado) => {
  return (req, res, next) => {
    let token;
    if (tipoEsperado === "access") {
      token = req.header("x-token");
    } else if (tipoEsperado === "refresh") {
      token = req.body?.token;
    }
    try {
      if (!token) {
        return res.status(401).json({ msg: "No hay token en la peticion" });
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      if (payload.tipo !== tipoEsperado) {
        return res
          .status(401)
          .json({ msg: `Error, se esperaba un ${tipoEsperado} token` });
      }

      req.usuario = payload;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Error al verificar", error });
    }
  };
};
module.exports = verificarJWT;
