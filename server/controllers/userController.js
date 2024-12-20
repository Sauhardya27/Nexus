const User = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let avatarUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
      });
      avatarUrl = result.secure_url;
    }

    const newUser = await User.create({
      username,
      email,
      password, // Hashing should be implemented here
      avatar: avatarUrl,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };