import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

const app = express()

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  }
})

const userSocketMap = {}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  const userId = socket.handshake.query.userId

  if (!userId) return;

  userSocketMap[userId] = socket.id

  io.emit("onlineUsers", Object.keys(userSocketMap))

  socket.on("call-user", ({ to, offer }) => {
    console.log("backend received call offer")

    const targetedUserSocketId = userSocketMap[to]
    if (targetedUserSocketId) {
      io.to(targetedUserSocketId).emit("incoming-call", {
        from: userId,
        offer
      })
    }
  })

  // Receiver sends answer
  socket.on("answer-call", ({ to, answer }) => {
    const targetSocketId = userSocketMap[to]
    if (targetSocketId) {
      io.to(targetSocketId).emit("call-accepted", { answer })
    }
  })

  // ICE candidate exchange
  socket.on("ice-candidate", ({ to, candidate }) => {
    const targetSocketId = userSocketMap[to]
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice-candidate", { candidate })
    }
  })
  // ========================================================

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
    delete userSocketMap[userId]
    io.emit("onlineUsers", Object.keys(userSocketMap))
  })
})

function getSocketId(userId) {
  return userSocketMap[userId]
}

export { app, httpServer, io, getSocketId }