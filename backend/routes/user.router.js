import express from 'express'
import { handleLoginUser, handleLogoutUser, handleRegisterUser, handleGetProfileRequest, handleGetAllUsersRequest, handleDeleteAccount, handleUploadProfilePicture } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import multer from 'multer'
const upload = multer();

const userRouter = express.Router()

userRouter.post('/register', handleRegisterUser)

userRouter.post('/login', handleLoginUser)

userRouter.post('/logout', handleLogoutUser)

userRouter.post('/upload-profile-picture', isAuthenticated, upload.single('profilePicture'), handleUploadProfilePicture);

userRouter.get('/get-profile', isAuthenticated, handleGetProfileRequest)

userRouter.get('/get-other-users', isAuthenticated, handleGetAllUsersRequest)

userRouter.post('/delete-account', isAuthenticated, handleDeleteAccount)

export { userRouter }
