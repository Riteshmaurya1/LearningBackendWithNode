const User = require("../Model/user");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../auth/jwt");

const userSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic Inputs
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Invalid Credentials.",
        success: false,
      });
    }

    // check is user is existing or not.
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered, Please Login",
        success: false,
      });
    }

    // hash the password for security resions.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Making payload for sending to token
    const userPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    // making Token
    const token = generateJwtToken(userPayload);
    console.log(token);

    // return responce
    return res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      err: err.message,
      success: false,
    });
  }
};

module.exports = {
  userSignUp,
};
