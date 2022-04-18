const nodemailer = require('nodemailer')

const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

function sendEmail(options) {
    return new Promise((resolve, reject) => {
        const to = options.to
        const subject = options.subject
        const message = options.message

        const messageHTML = options.html || message.replaceAll('\n', '<br/>')

        console.log('email sending?');

        transporter.sendMail({
            from: `"Automated Message" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text: message,
            html: messageHTML
        }).then((sentMessageInfo) => {
            const wasSentSuccessfully = sentMessageInfo.accepted.includes(to)
            if (wasSentSuccessfully) {
                resolve()
            } else {
                reject()
            }
        }).catch((err) => {
            console.log('Error sending Email', err);
            reject()
        })
    })
}

module.exports = { sendEmail }