const sendPasswordResetMail = require("../Config/forgetPassword-mailer");
const forgetPassword = async (req, res) => {
  try {
    //1. receive email from body.
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    // Invoke the forgot email func
    const response = await sendPasswordResetMail(email);

    // return res for the confirmation
    return res.status(200).json({
      response,
      message: "Password reset email sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to send email",
      error: err.message,
    });
  }
};

module.exports = forgetPassword;
