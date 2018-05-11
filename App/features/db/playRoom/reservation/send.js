const nodemailer = require('nodemailer');

module.exports.sendMail = function (data, body) {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'prestemosudea@gmail.com', // generated ethereal user
            pass: 'checho10'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"PrestemosUdeA" <prestemosudea@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: 'Reserva Prestemos UdeA', // Subject line
        text: " Señor(a) " + data.name + " " + "Su reserva a sido exitosa " +  "en la fecha " + body.resevationDate + " con los implementos:\n" + "video juego: " + body.videoGame + "\n" +  "Consola: " + body.console + "\n"
        + "controles: " + body.controlQuantity + "\n"
        // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

    });


}