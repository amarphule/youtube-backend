import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImaage,
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
router.route("/refreshToken").post(verifyJwt, refreshAccessToken);
router.route("/changePasswod").post(verifyJwt, changeCurrentPassword);

router.route("/updateDetails").patch(verifyJwt, updateAccountDetails);
router
  .route("/updateAvatar")
  .patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
router
  .route("/updateCoverImage")
  .patch(verifyJwt, upload.single("coverImage"), updateUserCoverImaage);

router.route("/currentUser").get(verifyJwt, getCurrentUser);
router.route("/channel/:username").get(verifyJwt, getUserChannelProfile);
router.route("/history").get(verifyJwt, getWatchHistory);

export default router;
