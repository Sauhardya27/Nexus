import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Loader2, Image, Trash2, Edit3, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const {
    authUser,
    isUpdatingProfile,
    updateProfile,
    updateWallpaper,
    checkAuth,
  } = useAuthStore();
  
  const [avatar, setAvatar] = useState({
    file: null,
    url: authUser?.avatar || "/avatar.png",
    isLoading: false,
  });

  const [wallpaper, setWallpaper] = useState({
    file: null,
    url: authUser?.wallpaper || "",
    isLoading: false,
  });

  const [isDeletingWallpaper, setIsDeletingWallpaper] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    username: authUser?.username || "",
    email: authUser?.email || "",
  });
  const [isUpdatingField, setIsUpdatingField] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser?.avatar) {
      setAvatar((prev) => ({
        ...prev,
        url: authUser.avatar,
      }));
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser?.wallpaper) {
      setWallpaper((prev) => ({
        ...prev,
        url: authUser.wallpaper,
      }));
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.username || "",
        email: authUser.email || "",
      });
    }
  }, [authUser]);

  const uploadToCloudinary = async (file, folder = "") => {
    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("upload_preset", "myCloud");

      if (folder) {
        cloudinaryFormData.append("folder", folder);
      }

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload an image file");
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size should be less than 5MB");
    }

    try {
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
        isLoading: true,
      });

      const avatarUrl = await uploadToCloudinary(file);
      await updateProfile({ avatar: avatarUrl });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile picture");

      setAvatar({
        file: null,
        url: authUser?.avatar || "/avatar.png",
        isLoading: false,
      });
    }
  };

  const handleWallpaperUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload an image file");
    }

    if (file.size > 10 * 1024 * 1024) {
      return toast.error("Wallpaper size should be less than 10MB");
    }

    try {
      setWallpaper({
        file: file,
        url: URL.createObjectURL(file),
        isLoading: true,
      });

      const wallpaperUrl = await uploadToCloudinary(
        file,
        "images/chat-wallpapers"
      );

      const updateResult = await updateWallpaper({ wallpaper: wallpaperUrl });

      toast.success("Chat wallpaper updated successfully!");
    } catch (error) {
      console.error("Wallpaper update error:", error);
      toast.error(error.message || "Failed to update chat wallpaper");

      setWallpaper({
        file: null,
        url: authUser?.wallpaper || "",
        isLoading: false,
      });
    }
  };

  const handleWallpaperDelete = async () => {
    if (wallpaper.url === "") {
      return toast.error("Default wallpaper is already active");
    }

    try {
      setIsDeletingWallpaper(true);
      setShowDeleteModal(false);

      setWallpaper({
        file: null,
        url: "",
        isLoading: false,
      });

      const updateResult = await updateWallpaper({
        wallpaper: "",
      });

      toast.success("Chat wallpaper reset to default successfully!");
    } catch (error) {
      console.error("Wallpaper delete error:", error);
      toast.error(error.message || "Failed to reset chat wallpaper");

      setWallpaper({
        file: null,
        url: authUser?.wallpaper || "",
        isLoading: false,
      });
    } finally {
      setIsDeletingWallpaper(false);
    }
  };

  const handleEditField = (field) => {
    setEditingField(field);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setFormData({
      username: authUser?.username || "",
      email: authUser?.email || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveField = async () => {
    if (!formData.username.trim()) {
      return toast.error("Username cannot be empty");
    }

    if (!formData.email.trim()) {
      return toast.error("Email cannot be empty");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    try {
      setIsUpdatingField(true);

      const updatedData = {};
      if (formData.username !== authUser.username) {
        updatedData.username = formData.username;
      }
      if (formData.email !== authUser.email) {
        updatedData.email = formData.email;
      }

      if (Object.keys(updatedData).length > 0) {
        await updateProfile(updatedData);
      }

      setEditingField(null);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
      
      setFormData({
        username: authUser?.username || "",
        email: authUser?.email || "",
      });
    } finally {
      setIsUpdatingField(false);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleImageLoad = () => {
    setAvatar((prev) => ({
      ...prev,
      isLoading: false,
    }));
  };

  const handleWallpaperLoad = () => {
    setWallpaper((prev) => ({
      ...prev,
      isLoading: false,
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-base-300 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">Profile</h1>
            <p className="mt-2 text-lg">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="size-24 rounded-full border-4 relative overflow-hidden">
                {avatar.isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-base-200">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                )}
                <img
                  src={avatar.url}
                  alt="Profile"
                  className="size-full object-cover transition-opacity duration-300"
                  onLoad={handleImageLoad}
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Chat Wallpaper</h2>
              <p className="text-sm text-zinc-400 mt-1">
                Customize your chat background
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full max-w-xs">
                <div className="w-full h-48 rounded-2xl border-4 border-zinc-600 relative overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200">
                  {/* Header */}
                  <div className="absolute top-0 left-0 right-0 bg-gray-700 bg-opacity-90 text-white text-center py-2 text-base font-medium">
                    Chat Wallpaper Preview
                  </div>

                  {wallpaper.isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-200 z-10">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  )}

                  {wallpaper.url === "" || !wallpaper.url ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                      <div className="text-xl font-semibold mt-12 text-center">
                        No Image Available
                      </div>

                      <svg
                        className="w-28 h-28 text-gray-400 opacity-60"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zm16 2v8.59l-3.3-3.3a1 1 0 0 0-1.4 0L12 14.59l-2.3-2.3a1 1 0 0 0-1.4 0L4 16.59V6h16zM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </div>
                  ) : (
                    <img
                      src={wallpaper.url}
                      alt="Chat Wallpaper Preview"
                      className="w-full h-full object-cover transition-opacity duration-300"
                      onLoad={handleWallpaperLoad}
                      onError={() => {
                        setWallpaper((prev) => ({
                          ...prev,
                          url: "",
                        }));
                      }}
                    />
                  )}
                </div>

                <label
                  htmlFor="wallpaper-upload"
                  className={`
        absolute bottom-3 right-3 
        bg-gray-700 hover:bg-gray-600 hover:scale-105
        p-3 rounded-full cursor-pointer 
        transition-all duration-200 shadow-lg border-2 border-white
        ${
          isUpdatingProfile || wallpaper.isLoading || isDeletingWallpaper
            ? "animate-pulse pointer-events-none"
            : ""
        }
      `}
                >
                  <Image className="w-6 h-6 text-white" />
                  <input
                    type="file"
                    id="wallpaper-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleWallpaperUpload}
                    disabled={
                      isUpdatingProfile ||
                      wallpaper.isLoading ||
                      isDeletingWallpaper
                    }
                  />
                </label>

                {wallpaper.url !== "" && wallpaper.url && (
                  <button
                    onClick={openDeleteModal}
                    className={`
          absolute bottom-3 left-3 
          bg-red-600 hover:bg-red-700 hover:scale-105
          p-3 rounded-full cursor-pointer 
          transition-all duration-200 shadow-lg border-2 border-white
          ${
            isUpdatingProfile || wallpaper.isLoading || isDeletingWallpaper
              ? "animate-pulse pointer-events-none"
              : ""
          }
        `}
                    disabled={
                      isUpdatingProfile ||
                      wallpaper.isLoading ||
                      isDeletingWallpaper
                    }
                  >
                    {isDeletingWallpaper ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Trash2 className="w-6 h-6 text-white" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
          
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 font-semibold flex items-center gap-2">
                <User className="w-4 h-4" strokeWidth={3} />
                Full Name
              </div>
              {editingField === 'username' ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 bg-base-200 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                    disabled={isUpdatingField}
                  />
                  <button
                    onClick={handleSaveField}
                    disabled={isUpdatingField}
                    className="px-3 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    {isUpdatingField ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUpdatingField}
                    className="px-3 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="flex-1 px-4 py-2.5 bg-base-200 rounded-xl border">
                    {authUser?.username}
                  </p>
                  <button
                    onClick={() => handleEditField('username')}
                    className="px-3 py-2.5 bg-primary hover:bg-primary-focus text-white rounded-xl transition-colors duration-200"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" strokeWidth={3} />
                Email Address
              </div>
              {editingField === 'email' ? (
                <div className="flex gap-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 bg-base-200 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email address"
                    disabled={isUpdatingField}
                  />
                  <button
                    onClick={handleSaveField}
                    disabled={isUpdatingField}
                    className="px-3 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    {isUpdatingField ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUpdatingField}
                    className="px-3 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="flex-1 px-4 py-2.5 bg-base-200 rounded-xl border">
                    {authUser?.email}
                  </p>
                  <button
                    onClick={() => handleEditField('email')}
                    className="px-3 py-2.5 bg-primary hover:bg-primary-focus text-white rounded-xl transition-colors duration-200"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-3 px-6">
            <h2 className="text-lg font-semibold mb-2">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-300 rounded-xl p-6 w-full max-w-md mx-auto shadow-2xl border border-zinc-600">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-base-content">
                  Reset Chat Wallpaper?
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  This will reset your chat wallpaper to the default. This
                  action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 px-4 py-2 bg-base-200 hover:bg-base-100 text-base-content rounded-lg transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWallpaperDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Reset Wallpaper
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;