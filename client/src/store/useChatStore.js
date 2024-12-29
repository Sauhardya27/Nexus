import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
	chats: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isChatsLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true });
		try {
			const response = await axiosInstance.get("/chat/users");
			set({ users: response.data });
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getChats: async (userId) => {
		set({ isChatsLoading: true });
		try {
			const response = await axiosInstance.get(`/chat/${userId}`);
			set({ chats: response.data });
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			set({ isChatsLoading: false });
		}
	},

	//todo: optimize this one later
	setSelectedUser: (selectedUser) => {
		set({ selectedUser });
	},
}));