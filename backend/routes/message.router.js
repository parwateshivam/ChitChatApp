import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { handleGetMessages, handleSendMessage } from '../controllers/message.controller.js'

const messageRouter = express.Router()

messageRouter.post('/send/:receiverId', isAuthenticated, handleSendMessage)

messageRouter.get('/get-message/:otherParticipantId', isAuthenticated, handleGetMessages)

export { messageRouter }