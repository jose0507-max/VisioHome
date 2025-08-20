const jwt = require("jsonwebtoken");
require("dotenv").config();

const generarJWT = (data = {}, tipo = "access") => {
  const tiempo = {
    access: "1h",
    refresh: "7d",
  };

  if (!tiempo[tipo]) {
    throw new Error(`Tipo de token no válido `);
  }
  return new Promise((resolve, reject) => {
    const payload = { ...data, tipo };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: tiempo[tipo] },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generarJWT;
