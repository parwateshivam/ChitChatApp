import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js"

export const handleRegisterUser = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body

  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("All fields are required", 400))
  }

  const userExist = await User.findOne({ username })
  if (userExist) {
    return next(new errorHandler("User already exists", 400))
  }

  const hashed = await bcrypt.hash(password, 10)

  let name = fullName

  name = name.replace(" ", "")

  const avatar = `https://avatar.iran.liara.run/username?username=${name}`

  const newUser = await User.create({
    fullName,
    username,
    password: hashed,
    gender,
    avatar
  })

  const payload = {
    id: newUser._id
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" })

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        newUser,
        token
      }
    })
})

export const handleLoginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next(new errorHandler("All fields are required", 400))
  }

  const userExist = await User.findOne({ username })
  if (!userExist) {
    return next(new errorHandler("Something went wrong", 400))
  }

  const verifyPassword = await bcrypt.compare(password, userExist.password)
  if (!verifyPassword) {
    return next(new errorHandler("Something went wrong", 400))
  }

  const payload = {
    id: userExist._id
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" })

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        user: userExist,
        token
      }
    })
})

export const handleLogoutUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Logout successful!",
    });
});

export const handleGetProfileRequest = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      responseData: req.user
    })
})

export const handleGetAllUsersRequest = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    _id: { $ne: req.user._id }
  }).select("-password")

  res.status(200).json({
    success: true,
    responseData: users
  })
})
