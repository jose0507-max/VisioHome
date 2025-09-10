const express = require("express");
const router = express.Router();
const getUsuarios = require("../controllers/getUsuarios");
const login = require("../controllers/authLogin");
const registro = require("../controllers/registrarUsuario");
const {validarCampos, validarUsuarioContraseña} = require('../middlewares/validarCampos')
const verificarJWT = require("../middlewares/verificarJWT");
const actualizarusuarios = require("../controllers/actualizarUsuarios");
const validarRol = require("../middlewares/validarRol");
const uploads = require('../middlewares/subirImagenes')
const subirImagen = require('../controllers/subirImagenController')
const sendMail = require('../controllers/sendMail')

router.put("/actualizar/:id",verificarJWT('access'),actualizarusuarios);
router.get("/usuarios", verificarJWT("access"), getUsuarios);
router.post("/registro", registro);
router.post('/imagenes', uploads.single('foto'), subirImagen);
router.post("/login", login);
router.post('/enviarCodigo', sendMail);


module.exports = router;
