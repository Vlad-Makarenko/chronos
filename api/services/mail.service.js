const nodemailer = require('nodemailer');
const tokenService = require('./token.service');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendGreeting(to) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Congratulations! You have just registered in Chronos`,
      text: '',
      html: `
                <div>
                    <h1>Congratulations! You have just registered in Chronos</h1>
                </div>
            `,
    });
  }

  async sendPswResetMail(to) {
    const { accessToken } = tokenService.generateTokens({ email: to });
    const link = `${process.env.CLIENT_URL}/password-reset/${accessToken}`;
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Password reset for Stack Overclone`,
      text: '',
      html: `
                <div>
                    <h1>Follow the link to reset your password</h1>
                    <a href="${link}">click me to reset password!</a>
                </div>
            `,
    });
  }
}

module.exports = new MailService();
