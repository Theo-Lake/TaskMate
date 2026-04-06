import nodemailer from "nodemailer";
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendWelcomeEmail(toEmail: string, username: string) {
    await transporter.sendMail({
        from: `"TaskMate" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: "Welcome to TaskMate!",
        text: `Hi ${username}, thanks for creating an account on TaskMate!`,
        html: `<p>Hi <strong>${username}</strong>,</p><p>Thanks for creating an account on TaskMate!</p><p>We're still in beta, so if you have any feedback, suggestions, or run into any issues — just reply to this email. We'd love to hear from you!</p>`,
    });
}

async function sendVerificationEmail(
    toEmail: string,
    username: string,
    token: string
) {
    await transporter.sendMail({
        from: `"TaskMate" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: "Verify your TaskMate email",
        text: `Hi ${username}, your verification token is: ${token}`,
        html: `
            <p>Hi <strong>${username}</strong>,</p>
            <p>Use the token below to verify your email address:</p>
            <div style="margin: 20px 0; padding: 16px; background: #f4f4f4; border-radius: 8px; text-align: center; font-size: 24px; font-family: monospace; letter-spacing: 4px;">
                ${token}
            </div>
            <p>This token expires in <strong>10 minutes</strong>. If you didn't create an account, you can ignore this email.</p>
        `,
    });
}

async function sendPasswordResetEmail(
    toEmail: string,
    username: string,
    token: string
) {
    await transporter.sendMail({
        from: `"TaskMate" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: "Verify your password change",
        text: `Hi ${username}, your password change verification token is: ${token}`,
        html: `
            <p>Hi <strong>${username}</strong>,</p>
            <p>Use the token below to change your password:</p>
            <div style="margin: 20px 0; padding: 16px; background: #f4f4f4; border-radius: 8px; text-align: center; font-size: 24px; font-family: monospace; letter-spacing: 4px;">
                ${token}
            </div>
            <p>This token expires in <strong>10 minutes</strong>. If you didn't request a password change, you can ignore this email.</p>
        `,
    });
}

export const emailServices = {
    sendWelcomeEmail,
    sendVerificationEmail,
    sendPasswordResetEmail,
};
