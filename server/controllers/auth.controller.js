import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
	const { username, email, password, avatar } = req.body;
	try {
		if(!username || !email || !password || !avatar) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email });

		if(user) return res.status(400).json({ message: "Email already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User({
			username,
			email,
			password: hashedPassword,
			avatar,
		});

		if(newUser){
			generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({ 
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				avatar: newUser.avatar
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if(!user){
			return res.status(400).json({ message: "Invalid credentials" });
		} 

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if(!isPasswordCorrect){
			return res.status(400).json({ message: "Invalid credentials" });
		}

		generateToken(user._id, res);

		res.status(200).json({ 
			_id: user._id,
			username: user.username,
			email: user.email,
			avatar: user.avatar
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { avatar }= req.body;
		const userId = req.user._id;

		if(!avatar){
			return res.status(400).json({ message: "Avatar is required" });
		}

		const uploadResponse = await cloudinary.uploader.upload(avatar);
		const updatedUser = await User.findByIdAndUpdate(userId, { avatar: uploadResponse.secure_url }, { new: true });

		res.status(200).json(updatedUser);
	} catch (error) {
		console.log("Error in update profile", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const checkAuth = (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log("Error in checkAuth controller", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}