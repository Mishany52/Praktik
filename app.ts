import express from "express"
import userRouter from "./userRouter"
import CookieParser from 'cookie-parser' 
const app = express()
const port = 5000
app.use(express.json())
app.use(CookieParser())
app.use('/', userRouter)
app.listen(port, ()=> console.log(`Running on port ${port}`))