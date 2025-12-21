import { app, httpServer } from './socketConfig/socket.js'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { userRouter } from './routes/user.router.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'
import { messageRouter } from './routes/message.router.js'

connectDB()

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}

app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', userRouter)
app.use('/api/message', messageRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
