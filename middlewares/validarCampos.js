const { body, param } = require("express-validator");
const catchErrores = require("./catchErrores");
const nombreValido = body("nombre")
  .isString()
  .withMessage("El nombre debe ser valido")
  .notEmpty()
  .withMessage("El nombre no puede estar vacio");

const validarCampos = [
  nombreValido,
  body("correo")
    .isEmail()
    .withMessage("El correo debe ser valido")
    .notEmpty()
    .withMessage("el correo no puede estar vacio"),

  body("rol")
    .isString()
    .withMessage("El rol debe ser valido")
    .notEmpty()
    .withMessage("el rol no puede estar vacio"),
  catchErrores,
];

const validarUsuarioContraseña = [
  nombreValido,
  body('password') 
  .isString().withMessage('La contraseña debe ser un valor valido')
  .notEmpty().withMessage('La contraseña no debe estar vacía'),
  catchErrores
];


module.exports = {validarCampos, validarUsuarioContraseña};

