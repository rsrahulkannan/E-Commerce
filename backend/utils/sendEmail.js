import nodemailer from 'nodemailer';

const sendMail = async (name, email, subject, verifyUrl) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        const emailtemplate = `
            <html>
                <body>
                    <h1>Hello, ${name}</h1>
                    <p>Thank you for signing up with us. To verify your account click the below button</p>
                    <a href='${verifyUrl}'>Verify</a>
                    <p>Link will be expire in an hour</p>
                <body>
            </html>
        `;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            html: emailtemplate
        });

        console.log(`Email has been send successfully`);
    } catch (error) {
        console.log(`Email Cant send: ${error.message}`);
        process.exit(1);
    }
}

export default sendMail;