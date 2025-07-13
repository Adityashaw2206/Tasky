// ✅ Step 1: Update `user.controller.js` to include a route to fetch current user

import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = AsyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;

  if (fullname === "") {
    throw new ApiError(400, "Full name is required");
  }
  if (
    [fullname, email, username, password].some(
      (field) => field && field.trim() == ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "Username or Email already exists");
  }

  const user = await User.create({
    username: username?.toLowerCase(),
    fullname,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    throw new ApiError(400, "Username or email and password are required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          refreshToken,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = AsyncHandler(async (req, res) => {
  await findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getCurrentUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
