import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import LoginPanel from "../components/LoginPanel";
import { useAuthStore } from "../store/useAuthStore";

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
    <div className="h-screen grid lg:grid-cols-[7fr_3fr] overflow-hidden">
      <LoginPanel/>

      <div className="flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-base-100 to-base-200">
        <div className="w-full max-w-md lg:pt-14 space-y-4 lg:space-y-6">
        
          <div className="text-center mb-4 lg:mb-8">
            <div className="flex flex-col items-center gap-2 lg:gap-3 group">
              <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-lg">
                <MessageSquare className="w-5 h-5 lg:w-7 lg:h-7 text-primary" />
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold mt-1 lg:mt-3 bg-gradient-to-r from-base-content to-base-content/80 bg-clip-text">
                Welcome Back
              </h1>
              <p className="text-sm lg:text-base text-base-content/70 font-medium">
                Sign in to your account
              </p>
            </div>
          </div>


          <div className="bg-base-100/70 backdrop-blur-sm rounded-2xl p-4 lg:p-8 shadow-xl border border-base-300/50">
            <div className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary w-full h-10 lg:h-12 rounded-xl font-semibold text-sm lg:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 lg:h-5 lg:w-5 animate-spin" />
                    <span className="text-sm lg:text-base">Loading...</span>
                  </>
                ) : (
                  <span className="text-sm lg:text-base">Sign in</span>
                )}
              </button>
            </div>

            <div className="text-center mt-3 lg:mt-6">
              <p className="text-xs lg:text-sm text-base-content/70">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="link link-primary font-semibold hover:text-primary/80 transition-colors text-xs lg:text-sm"
                >
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;