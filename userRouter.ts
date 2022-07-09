import Router from 'express'
import userControll from './userControll'
const userRouter = Router()

// userRouter.get('/profile', )
userRouter.post('/set-info', userControll.setInfo)
userRouter.post('/sign-up', userControll.signUp)
userRouter.post('/login', userControll.login)

export default userRouter