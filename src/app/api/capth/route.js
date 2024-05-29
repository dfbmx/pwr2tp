import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

export async function POST(req) {
  const { name, email, subject, message, captcha } = await req.json();

  // Verify reCAPTCHA
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`, {
    method: 'POST',
  });
  const captchaValidation = await response.json();

  if (!captchaValidation.success) {
    return new Response(JSON.stringify({ status: 'CAPTCHA validation failed' }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru', // Mail.ru SMTP server
    port: 465, // Use 465 for secure connections
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAILRU_USER,
      pass: process.env.MAILRU_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.MAILRU_USER}>`, // Authenticated Mail.ru email address
      to: process.env.EMAIL_TO, // List of receivers
      replyTo: email, // User's email as the reply-to address
      subject: `New message from ${name} - ${subject}`, // Subject line
      text: message, // Plain text body
      html: `<p>${message}</p>`, // HTML body
    });

    return new Response(JSON.stringify({ status: 'Message sent successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ status: 'Error sending email' }), { status: 500 });
  }
}
