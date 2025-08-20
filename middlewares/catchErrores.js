const {validationResult} = require('express-validator');

const catchErrores = (req, res, next) =>{
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
        errores: errores.array(),
        ok: false
        });
    }
    next();
}

module.exports = catchErrores;