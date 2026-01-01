import express from "express";
import { 
  createNewUser, 
  loginUser, 
  logoutUser,
  getMyProfile 
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", createNewUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);
router.get("/me",isAuthenticated, getMyProfile);

export default router;