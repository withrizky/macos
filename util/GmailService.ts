import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

interface EmailOptions {
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

class GmailService {
  private createTransporter() {
    const email = process.env.GMAIL_USER;
    const password = process.env.GMAIL_PASSWORD;

    if (!email || !password) {
      throw new Error('Server misconfigured: Missing GMAIL_USER or GMAIL_PASSWORD');
    }

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });
  }

  async send(options: EmailOptions): Promise<any> {
    const transporter = this.createTransporter();

    const mailOptions: SendMailOptions = {
      from: options.from,
      to: process.env.GMAIL_USER,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(
        `Failed to send email: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

const gmailService = new GmailService();

export default gmailService;
