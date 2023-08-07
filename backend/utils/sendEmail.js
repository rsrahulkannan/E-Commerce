import nodemailer from 'nodemailer';

const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: text
        });

        console.log(`Email has been send successfully`);
    } catch (error) {
        console.log(`Email Cant send: ${error.message}`);
        process.exit(1);
    }
}

export default sendMail;