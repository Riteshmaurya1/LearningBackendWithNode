const sendPasswordResetMail = require("../mail/forgetPassword-mailer");
const ForgotPasswordRequests = require("../Model/forgetPassword");
const User = require("../Model/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const forgetPassword = async (req, res) => {
  try {
    //1. receive email from body.
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email are required",
      });
    }

    // Check user is exit or not.
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Generate the uuid for user identification.
    const uuid = uuidv4();

    // Store the details to the user.
    await ForgotPasswordRequests.create({
      uuid: uuid,
      userId: user.id,
      isActive: true,
    });

    // Making the reset link for sending to the user via mail.
    const resetLink = `http://localhost:3000/password/resetpassword/${uuid}`;

    // Invoke the forgot email func
    const response = await sendPasswordResetMail(email, resetLink);

    // return res for the confirmation
    return res.status(200).json({
      message: "Password reset email sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to send email",
      error: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { uuid } = req.params;

    const request = await ForgotPasswordRequests.findOne({ where: { uuid } });
    if (!request || !request.isActive) {
      return res.status(400).json({
        message: "Invalid or expired reset link",
      });
    }
    res.send(`
    <form action="/password/updatepassword" method="POST">
      <input type="hidden" name="uuid" value="${uuid}" />
      <input type="password" name="newPassword" placeholder="New password" required />
      <button type="submit">Reset Password</button>
    </form>
  `);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to send email",
      error: err.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { uuid, newPassword } = req.body;

    const request = await ForgotPasswordRequests.findOne({ where: { uuid } });
    if (!request || !request.isActive) {
      return res.status(400).json({
        message: "Invalid or expired reset link",
      });
    }
    // Update user password
    const user = await User.findByPk(request.userId);
    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed });

    // Mark link as used
    await request.update({ isActive: false });

    // Send a confimation response
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to send email",
      error: err.message,
    });
  }
};

module.exports = {
  forgetPassword,
  resetPassword,
  updatePassword,
};
