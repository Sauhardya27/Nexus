import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import LoginPanel from "../components/LoginPanel";
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
        // console.log("Signup result:", result);

      } catch (error) {
        console.error("Full signup error:", error);
        toast.error(error.message || "Failed to create account");
      }
    }
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
    <div className="h-screen grid lg:grid-cols-[7fr_3fr] overflow-hidden">
      <LoginPanel />

      <div className="flex flex-col p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-base-100 to-base-200 overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center py-4 lg:py-8 space-y-3 lg:space-y-4">
        
          <div className="text-center mb-2 lg:mb-4 lg:pt-10">
            <div className="flex flex-col items-center gap-1 lg:gap-2 group">
              <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-lg">
                <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6 text-primary" />
              </div>
              <h1 className="text-xl lg:text-3xl font-bold mt-1 lg:mt-2 bg-gradient-to-r from-base-content to-base-content/80 bg-clip-text">
                Create Account
              </h1>
              <p className="text-xs lg:text-sm text-base-content/70 font-medium">
                Get started with your free account
              </p>
            </div>
          </div>

          <div className="bg-base-100/70 backdrop-blur-sm rounded-2xl p-3 lg:p-6 shadow-xl border border-base-300/50">
          
            <div className="flex flex-col items-center gap-1 mb-3 lg:mb-4">
              <label
                className="cursor-pointer flex flex-col items-center justify-center gap-1"
                htmlFor="file"
              >
                <img
                  src={avatar.url || "./avatar.png"}
                  alt="avatar"
                  className="h-12 w-12 lg:h-16 lg:w-16 rounded-full object-cover hover:opacity-80 transition-opacity border-3 border-primary/20"
                />
                <span className="text-xs text-base-content/70 hover:text-primary transition-colors font-medium">
                  Upload an avatar
                </span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleAvatar}
              />
            </div>

            <form className="space-y-3 lg:space-y-4" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label pb-1 lg:pb-2">
                  <span className="label-text text-sm lg:text-base font-semibold text-base-content/90">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 lg:h-5 lg:w-5 text-base-content/50" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered border-2 w-full pl-10 lg:pl-12 h-10 lg:h-12 bg-base-200/50 focus:bg-base-100 transition-colors duration-200 rounded-xl text-sm lg:text-base"
                    placeholder="John Doe"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label pb-1 lg:pb-2">
                  <span className="label-text text-sm lg:text-base font-semibold text-base-content/90">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-base-content/50" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered border-2 w-full pl-10 lg:pl-12 h-10 lg:h-12 bg-base-200/50 focus:bg-base-100 transition-colors duration-200 rounded-xl text-sm lg:text-base"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label pb-1 lg:pb-2">
                  <span className="label-text text-sm lg:text-base font-semibold text-base-content/90">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 lg:h-5 lg:w-5 text-base-content/50" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered border-2 w-full pl-10 lg:pl-12 pr-10 lg:pr-12 h-10 lg:h-12 bg-base-200/50 focus:bg-base-100 transition-colors duration-200 rounded-xl text-sm lg:text-base"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 lg:pr-4 flex items-center hover:text-base-content transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 lg:h-5 lg:w-5 text-base-content/50" />
                    ) : (
                      <Eye className="h-4 w-4 lg:h-5 lg:w-5 text-base-content/50" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-10 lg:h-12 rounded-xl font-semibold text-sm lg:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="h-4 w-4 lg:h-5 lg:w-5 animate-spin" />
                    <span className="text-sm lg:text-base">Creating Account...</span>
                  </>
                ) : (
                  <span className="text-sm lg:text-base">Create Account</span>
                )}
              </button>
            </form>

            <div className="text-center mt-2 lg:mt-4">
              <p className="text-xs text-base-content/70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-primary font-semibold hover:text-primary/80 transition-colors text-xs"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;