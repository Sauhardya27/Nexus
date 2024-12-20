const express = require("express");
const multer = require("multer");
const { sendMessage } = require("../controllers/chatController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/send", upload.single("image"), sendMessage);

module.exports = router;