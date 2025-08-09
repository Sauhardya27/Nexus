import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Loader2, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageUpload, setImageUpload] = useState({
    file: null,
    preview: null,
    isLoading: false,
  });
  const fileInputRef = useRef(null);
  const { sendChat } = useChatStore();

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload an image file");
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size should be less than 5MB");
    }

    try {
      setImageUpload({
        file: file,
        preview: URL.createObjectURL(file),
        isLoading: true,
      });

      const imageUrl = await uploadToCloudinary(file);

      setImageUpload((prev) => ({
        ...prev,
        isLoading: false,
      }));

      setImageUpload((prev) => ({
        ...prev,
        preview: imageUrl,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message || "Failed to upload image");

      setImageUpload({
        file: null,
        preview: null,
        isLoading: false,
      });
    }
  };

  const removeImage = () => {
    setImageUpload({
      file: null,
      preview: null,
      isLoading: false,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendChat = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imageUpload.preview) return;
    if (imageUpload.isLoading) {
      toast.error("Please wait for image to finish uploading");
      return;
    }

    try {
      await sendChat({
        text: text.trim(),
        image: imageUpload.preview,
      });

      setText("");
      setImageUpload({
        file: null,
        preview: null,
        isLoading: false,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full border-t border-base-300 bg-base-100">
      {imageUpload.preview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {imageUpload.isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-base-200/80 rounded-lg backdrop-blur-sm">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            )}
            <img
              src={imageUpload.preview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-base-300 shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-error text-error-content
                hover:scale-110 transition-transform shadow-sm flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendChat} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full input input-bordered text-sm h-10"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-sm 
								hover:bg-base-200 transition-colors duration-200"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={18} className="text-base-content/60" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-50">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  open={showEmojiPicker}
                  onOpenChange={setShowEmojiPicker}
                  theme="auto"
                />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle h-10 min-h-0 transition-all duration-200 hover:scale-105
							${
                imageUpload.preview
                  ? "btn-success shadow-sm"
                  : "btn-ghost text-base-content/60 hover:text-base-content hover:bg-base-200"
              }`}
            onClick={() => fileInputRef.current?.click()}
            disabled={imageUpload.isLoading}
          >
            {imageUpload.isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Image size={18} />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary h-10 min-h-0 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105
						disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={
            (!text.trim() && !imageUpload.preview) || imageUpload.isLoading
          }
        >
          {imageUpload.isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;