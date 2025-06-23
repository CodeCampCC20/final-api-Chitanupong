import express from "express";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/user.controller.js";
import { authCheck } from "../middleware/auth.middleware.js";


const router = express.Router();


// router.patch("/users/me", authCheck, updateUser);Get User Profile
// router.get("/users/me", authCheck, getMe);Update User Profile
router.patch("/users/me", authCheck, updateUserProfile);
router.get("/users/me", authCheck, getUserProfile);







// Export


export default router;
