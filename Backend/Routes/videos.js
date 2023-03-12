import express from 'express'
import { addVideo, deleteVideo, getVideo, updateVideo, addView, random } from '../controllers/videos.js';
import { verifyToken } from "../verifyToken.js"
const router = express.Router();


router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id",addView)
router.get("/randome",random)



export default router;