import express from 'express'
import { handleLoginUser, handleLogoutUser, handleRegisterUser, handleGetProfileRequest, handleGetAllUsersRequest } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const userRouter = express.Router()

userRouter.post('/register', handleRegisterUser)

userRouter.post('/login', handleLoginUser)

userRouter.post('/logout', handleLogoutUser)

userRouter.get('/get-profile', isAuthenticated, handleGetProfileRequest)

userRouter.get('/get-other-users', isAuthenticated, handleGetAllUsersRequest)

export { userRouter }
