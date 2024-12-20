const express = require("express");
const multer = require("multer");
const { registerUser } = require("../controllers/userController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Use multer for file upload

router.post("/register", upload.single("avatar"), registerUser);

module.exports = router;