const modeloActualizarusuarios = require('../models/modeloActualizarUser');

const actualizarusuarios = async (req, res) =>{
    const {id} = req.params;
    const {nombre, password} = req.body;
    try {
        const result = await modeloActualizarusuarios(id, nombre, password);
        if (!result.ok) {
            return res.status(400)
        }
        res.status(200).json({msg: 'result.msg'});
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg:'Error del servidor al actualizar'})
    }
}

module.exports =actualizarusuarios;