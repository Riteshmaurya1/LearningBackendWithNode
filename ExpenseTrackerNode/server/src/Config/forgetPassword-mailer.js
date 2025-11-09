require("dotenv").config();
const Sib = require("sib-api-v3-sdk");

// Setup Brevo API key but we go with API Key&MCP Not with SMTP.
const apiKey = Sib.ApiClient.instance.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_API;
const emailApi = new Sib.TransactionalEmailsApi();

// Here we get the sender mail and name from body.
const sendPasswordResetMail = async (email) => {
  try {
    const response = await emailApi.sendTransacEmail({
      sender: { name: "Support Team", email: "riteshkumar04294@gmail.com" },
      to: [{ email }],
      subject: "Password Reset Request",
      htmlContent: `
        <p>Dear User,</p>
        <p>We received a request to reset your password for your account (<b>${email}</b>).</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <br>
        <p>– The Support Team</p>
      `,
    });
    return response;
  } catch (err) {
    console.error("Failed to send email:", err.response?.body || err);
  }
};

module.exports = sendPasswordResetMail;
