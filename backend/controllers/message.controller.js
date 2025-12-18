import { response } from "express"
import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { asyncHandler } from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js"

export const handleSendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id
  const receiverId = req.params.receiverId
  const { message } = req.body

  // 1️⃣ Validation
  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields are required", 400))
  }

  // 2️⃣ Find conversation (bi-directional)
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] }
  })

  // 3️⃣ Create conversation if not exists
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: []
    })
  }

  // 4️⃣ Create message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message
  })

  // 5️⃣ Push message into conversation
  conversation.messages.push(newMessage._id)
  await conversation.save()

  // 6️⃣ Response
  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    responseData: newMessage
  })
})

export const handleGetMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("All fields are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate("messages");

  res.status(200).json({
    success: true,
    responseData: conversation,
  });
});
