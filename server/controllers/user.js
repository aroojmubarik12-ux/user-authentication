const userModel = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email already exists, please use another email"
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Token generation
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET || "default_secret"
    );

    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      user: { id: user._id, email: user.email, firstName: user.firstName },
      token
    });

  } catch (error) {
    res.status(500).json({ success: false, msg: error.message || "Server Error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Please provide email and password" });
    }

    // Check user exist or not
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        msg: "User does not exist"
      });
    }

    // Password verification
    const matchedPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchedPassword) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email or password"
      });
    }

    // Generate token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET || "default_secret"
    );

    res.status(200).json({
      success: true,
      msg: "User logged in successfully",
      token
    });

  } catch (error) {
    res.status(500).json({ success: false, msg: error.message || "Server Error" });
  }
};

module.exports = { register, login };