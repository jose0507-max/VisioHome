const nodemailer = require('nodemailer');
const { head } = require('../routers/router');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'josefernandolondono0507@gmail.com',
        pass: process.env.MAIL_PASS
    }
});

const mailSender = (correo, codigo) => {
    const mailOptions = {
        from: '"Olimp Matix" <no-reply@olimpmatix.com>',
        to: correo,
        subject: 'Código de verificación',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
            
            <!-- Header -->
            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">
                Olimp Matix
            </h2>
            
            <!-- Body -->
            <p style="color: #333; font-size: 16px;">
                Hola 👋,
            </p>
            <p style="color: #333; font-size: 16px;">
                Alguien está intentando acceder a tu cuenta desde otro dispositivo.  
                Si fuiste tú, usa el siguiente código para verificar tu acceso:
            </p>
            
            <!-- Código -->
            <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; background: #2c3e50; color: #fff; font-size: 24px; font-weight: bold; padding: 15px 30px; border-radius: 8px; letter-spacing: 3px;">
                    ${codigo}
                </div>
            </div>
            
            <!-- Seguridad -->
            <p style="color: #666; font-size: 14px;">
                ⚠️ Si no fuiste tú quien intentó iniciar sesión, te recomendamos cambiar tu contraseña inmediatamente.
            </p>
            
            <!-- Footer -->
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="text-align: center; color: #999; font-size: 12px;">
                Este es un mensaje automático de <b>Olimp Matix</b>.  
                No respondas a este correo.
            </p>
        </div>
        `
    }
    return transporter.sendMail(mailOptions);
}

module.exports = mailSender;