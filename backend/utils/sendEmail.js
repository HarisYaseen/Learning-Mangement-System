import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    const mailOptions = {
      from: `"Hadi LMS" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: `<div style="font-family:Arial, sans-serif; color:#333;">
              <h2>${subject}</h2>
              <p>${message}</p>
              <hr/>
              <p style="font-size:12px; color:#888;">This is an automated email from Hadi LMS.</p>
            </div>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

export default sendEmail;
