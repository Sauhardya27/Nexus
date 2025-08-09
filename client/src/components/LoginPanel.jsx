import { Users } from "lucide-react";
import bg from "/bg.mp4";
import { CONTACTS, CHAT_MESSAGES } from "../constants/index";

const LoginPanel = () => {
  const janeDoe = CONTACTS.find((c) => c.name === "Jane Doe");

  return (
    <div className="h-screen w-full relative overflow-hidden hidden lg:block">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bg} type="video/mp4" />
      </video>

      <div className="absolute space-y-2 top-20 left-16 z-10 text-left max-w-xl">
        <p className="text-lg text-white leading-tight new-font">
          Conversations that Matter
        </p>
        <h1 className="text-3xl font-semibold text-white/90 new-font">
          Stay connected with everyone, everywhere, effortlessly.
        </h1>
      </div>

      <div className="relative top-48 left-16 z-10 flex max-w-6xl">

        <div className="flex bg-base-100/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full border border-white/20">
        
          <div className="w-80 bg-base-200/60 backdrop-blur-sm border-r border-base-300/50">
          
            <div className="p-5 border-b border-base-300/50">
              <div className="flex items-center gap-3 mb-5">
                <Users className="size-6" />
                <h2 className="text-lg font-bold text-base-content">
                  Contacts
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  id="online-only"
                />
                <label
                  htmlFor="online-only"
                  className="text-sm text-base-content/80 font-medium"
                >
                  Show online only{" "}
                  <span className="text-base-content/60">(0 online)</span>
                </label>
              </div>
            </div>

            <div className="overflow-y-auto max-h-96">
              {CONTACTS.map((contact) => (
                <div
                  key={contact.id}
                  className="p-4 hover:bg-base-300/40 cursor-pointer border-b border-base-300/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-11 h-11 object-cover rounded-full ring-2 ring-base-300/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-base-300 rounded-full border-2 border-base-100"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-base-content">
                        {contact.name}
                      </h3>
                      <p className="text-xs text-base-content/70 font-medium">
                        {contact.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
          
            <div className="px-6 py-5 border-b border-white/5 bg-transparent backdrop-blur-none flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={janeDoe.avatar}
                    alt={janeDoe.name}
                    className="w-11 h-11 object-cover rounded-full ring-2 ring-white/20"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base-content drop-shadow-sm">Jane Doe</h3>
                  <p className="text-sm text-base-content/80 font-medium drop-shadow-sm">
                    Offline
                  </p>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm rounded-lg hover:bg-white/5 backdrop-blur-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-transparent backdrop-blur-none min-h-[400px]">
              {CHAT_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isSent ? "justify-end" : "justify-start"
                  }`}
                >
                  {!message.isSent && (
                    <img
                      src={janeDoe.avatar}
                      alt={janeDoe.name}
                      className="w-8 h-8 mr-3 mt-1 object-cover rounded-full flex items-center justify-center ring-2 ring-white/20 flex-shrink-0 shadow-lg"
                    />
                  )}

                  <div className="flex flex-col max-w-md">
                    <div
                      className={`rounded-2xl p-4 shadow-lg backdrop-blur-none border transition-all duration-200 hover:shadow-xl ${
                        message.isSent
                          ? "bg-success/30 text-white rounded-br-md border-success/10 drop-shadow-sm"
                          : "bg-white/15 text-base-content rounded-bl-md border-white/10 drop-shadow-sm"
                      }`}
                    >
                      {message.hasImage && (
                        <div className="mb-3">
                          <div className="w-48 h-32 bg-gradient-to-br from-purple-400/80 via-pink-400/80 to-blue-400/80 rounded-xl mb-2 relative overflow-hidden shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <p className="text-sm font-medium leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 mt-2 ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <p className="text-xs text-base-content/80 font-medium drop-shadow-sm">
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-white/5 bg-transparent backdrop-blur-none">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="input w-full text-sm bg-white/10 backdrop-blur-none border-white/10 rounded-xl h-12 focus:bg-white/20 focus:border-white/20 transition-all duration-200 placeholder:text-base-content/60"
                    placeholder="Type a message..."
                  />
                </div>
                <button className="btn btn-ghost btn-sm rounded-xl hover:bg-white/5 backdrop-blur-none transition-all duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
                <button className="btn btn-ghost btn-sm rounded-xl hover:bg-white/5 backdrop-blur-none transition-all duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;