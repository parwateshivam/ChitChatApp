import { User } from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.replace("Bearer ", "");

  if (!token) {
    return next(new errorHandler("token not found", 404))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findById(decoded.id)

  req.user = user

  next()
})