import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import { userRouter } from './routes/user.router.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'
import { messageRouter } from './routes/message.router.js'

dotenv.config({ path: "./config.env" })

connectDB()

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}

const app = express()

app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', userRouter)
app.use('/api/message', messageRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
