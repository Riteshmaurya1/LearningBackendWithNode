const User = require("../Model/user");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../auth/jwt");

// ****************** Register Logic ********************
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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

// *********************** login Logic*******************
const login = async (req, res) => {
  try {
    // extracting data from body
    const { email, password } = req.body;

    // check if user is register or not
    const user = await User.findOne({ where: { email } });

    // Check correct password.
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    // compare password
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // making payload
    const userPayload = {
      id: user.id,
      username: user.username,
    };

    // generate token
    const token = generateJwtToken(userPayload);

    // return response with token.
    return res.status(200).json({
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
  login,
};
