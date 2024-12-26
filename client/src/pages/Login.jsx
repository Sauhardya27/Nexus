import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 -mt-20">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-12 h-12 rounded-xl bg-[#111928] bg-opacity-60 flex items-center justify-center group-hover:bg-[#25385d] 
              transition-colors"
                            >
                                <MessageSquare className="w-6 h-6 text-gray-400" />
                            </div>
                            <h1 className="text-4xl font-bold mt-2">Welcome Back</h1>
                            <p className="text-gray-400">Sign in to your account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10 py-2 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-md`}
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
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10 py-2 border-none outline-none bg-[#111928] bg-opacity-60 text-white rounded-md`}
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
                                        <EyeOff className="h-5 w-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-300">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="text-blue-600 hover:text-blue-500">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Pattern */}
            <div>
                <AuthImagePattern
                    title={"Welcome back!"}
                    subtitle={"Sign in to continue your conversations and catch up with your messages."}
                />
            </div>
        </div>
    );
};

export default Login;