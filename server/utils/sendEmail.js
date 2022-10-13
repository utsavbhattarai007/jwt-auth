import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: text,
      html: `<div style="width: 100%; height: 100%; background-color: #f2f2f2; padding: 20px 0;">
        <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px;">
            <div style="width: 100%; text-align: center; margin: 20px 0;">
                <h1 style="font-size: 30px; color: #333;">Welcome to <span style="color: #1fbcb4;">JWT</span> Auth</h1>
            </div>
            <div style="width: 100%; text-align: center; margin: 20px 0;">
                <p style="font-size: 20px; color: #333;">Please click the button below to verify your email address.</p>
            </div>
            <div style="width: 100%; text-align: center; margin: 20px 0;">
                <a href="${text}" style="text-decoration: none; background-color: #1fbcb4; color: #fff; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
            </div>
        </div>
    </div>`,
    });
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email", error);
  }
};

export default sendEmail;
