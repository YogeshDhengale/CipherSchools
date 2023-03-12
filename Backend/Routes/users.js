import express from 'express'
import { update, deleteUser, getUser, like, dislike } from '../controllers/users.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.put("/:id", verifyToken, update)

router.delete("/:id", verifyToken, deleteUser)

router.get("/find/:id", getUser)

router.put("/like/:videoid", verifyToken, like)

router.put("/dislike/:videoid", verifyToken, dislike)

export default router;