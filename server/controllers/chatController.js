const Chat = require("../models/chatModel");
const cloudinary = require("../lib/cloudinary");

const sendMessage = async (req, res) => {
	try {
		const { message, sender, receiver } = req.body;

		let imageUrl = null;
		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: "chat_images",
			});
			imageUrl = result.secure_url;
		}

		const chat = await Chat.create({
			message,
			sender,
			receiver,
			image: imageUrl,
		});

		res.status(201).json(chat);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { sendMessage };