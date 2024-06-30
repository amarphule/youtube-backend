import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Check fields are not empty
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fileds are required");
  }

  // Check user exists
  const existeduser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existeduser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Get avatar and coverImage from req.files (from multer .files is available), avatar file is required.
  // console.log(req.files.avatar); Can't access [Object: null prototype] directly is filed is empty.

  // If avatar field is empty it's undefined, we cant't access path like this req.files?.avatar.[0]?.path
  // So to check is avatar filed is empty or not we use req.files?.avatar?.[0]?.path (optonal chain before access 0th element )

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImagePath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Get avatar and coverImage cloudinary path from .url property and add to user
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagePath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required sssSS");
  }

  // User created in mDB
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // Removed password and refreshToken from response
  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createduser) {
    throw new ApiError(500, "Something went wrong while user creation");
  }

  // Printed response
  return res
    .status(201)
    .json(new ApiResponse(201, createduser, "User Created successfully"));
});

export { registerUser };
