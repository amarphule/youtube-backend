import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/users.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// if I dont pass middleware req.body is empty why?
// router.post("/register", registerUser);

router.route("/login").post(loginUser);

// Secured Routes
router.route("/logout").post(verifyJwt, logoutUser);

export default router;
