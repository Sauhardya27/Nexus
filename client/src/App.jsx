// import List from "./components/list/List";
// import Chat from "./components/chat/Chat";
// import Detail from "./components/detail/Detail";
// import Notification from "./components/notification/Notification";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

import { useAuthStore } from "./store/useAuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Navbar />
      <div className="relative flex w-[80vw] h-[85vh] mx-auto rounded-xl overflow-hidden backdrop-blur-xl bg-gradient-to-b from-blue-900/80 to-blue-950/80 border border-blue-700/30 shadow-2xl">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-4 top-0 w-24 h-24 rounded-full bg-blue-500/5"></div>
          <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-blue-400/5"></div>
        </div>

        {/* Main content */}
        <div className="relative flex-1">
          <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(30, 58, 138, 0.9)',
              color: '#E2E8F0',
              borderRadius: '0.75rem',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              backdropFilter: 'blur(8px)',
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;