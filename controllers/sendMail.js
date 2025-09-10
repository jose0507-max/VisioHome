const mailSender = require("../middlewares/mailSender");

const sendMail = async (req, res) => {
  try {
    const { correo } = req.body;
    const codigo = Math.floor(100000 + Math.random() * 900000);

    await mailSender(correo, codigo);
    res.status(200).json({ msg: "Codigo enviado correctamente" });
  } catch (error) {
    res.status(400).json({msg: 'Error al enviar el codigo ', codigo: `${codigo}`});
  }
};

module.exports = sendMail;