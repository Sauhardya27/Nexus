import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, getChats, sendMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getChats);

router.post("/send/:id", protectRoute, sendMessage);

export default router;