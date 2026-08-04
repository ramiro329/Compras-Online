const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: process.env.SMTP_PORT,

    secure: process.env.SMTP_PORT == 465,

    auth: {

        user: process.env.SMTP_USER,

        pass: process.env.SMTP_PASS

    }

})

transporter.verify((err) => {

    if (err) {

        console.log(err)

    } else {

        console.log('SMTP conectado correctamente')

    }

})

const enviarRecuperacionPassword = async (email, link) => {

    const htmlTemplate = `
        <div style="font-family: Arial, sans-serif;">

            <h2>Recuperación de contraseña</h2>

            <p>Haz clic en el siguiente botón para restablecer tu contraseña:</p>

            <a
                href="${link}"
                style="
                    background:#28a745;
                    color:white;
                    padding:10px 20px;
                    text-decoration:none;
                    border-radius:5px;
                "
            >
                Restablecer contraseña
            </a>

            <p>
                Si no solicitaste este cambio, puedes ignorar este correo.
            </p>

        </div>
    `

    return transporter.sendMail({

        from: `"Soporte" <${process.env.SMTP_USER}>`,

        to: email,

        subject: 'Recuperación de contraseña',

        html: htmlTemplate

    })

}

module.exports = {
    enviarRecuperacionPassword
}