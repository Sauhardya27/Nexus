import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.username.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (!avatar.file) return toast.error("Please upload an avatar!");

        return true;
    };

    const uploadToCloudinary = async (file) => {
        try {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", file);
            cloudinaryFormData.append("upload_preset", "myCloud");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/nexuschatapp/image/upload",
                {
                    method: "POST",
                    body: cloudinaryFormData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image to Cloudinary");
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) {
            try {
                const avatarUrl = await uploadToCloudinary(avatar.file);

                const userData = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    avatar: avatarUrl
                };

                const result = await signup(userData);
                console.log("Signup result:", result);

            } catch (error) {
                console.error("Full signup error:", error);
                toast.error(error.message || "Failed to create account");
            }
        };
    };

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    return (
        <div className="h-screen grid lg:grid-cols-2">
            {/* left side */}
            <div className="flex flex-col justify-center items-center w-full px-6 -mt-20 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            {/* Avatar upload */}
                            <label
                                className="cursor-pointer flex flex-col items-center justify-center gap-4"
                                htmlFor="file"
                            >
                                <img
                                    src={avatar.url || "./avatar.png"}
                                    alt="avatar"
                                    className="h-20 w-20 rounded-full object-cover opacity-70"
                                />
                                <span className="underline text-gray-300">Upload an image</span>
                            </label>
                            <input
                                type="file"
                                id="file"
                                className="hidden"
                                onChange={handleAvatar}
                            />

                            <h1 className="text-4xl font-bold mt-2">Create Account</h1>
                            <p className="text-gray-400">Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered pl-10 py-2 border-none outline-none bg-[#111928] bg-opacity-60 text-white w-full rounded-md"
                                    placeholder="John Doe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className="input input-bordered pl-10 py-2 border-none outline-none bg-[#111928] bg-opacity-60 text-white w-full rounded-md"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered pl-10 py-2 border-none outline-none bg-[#111928] bg-opacity-60 text-white w-full rounded-md"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-300">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 hover:text-blue-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}
            <div>
                <AuthImagePattern
                    title="Join our community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
            </div>
        </div>
    );
};

export default SignUp;