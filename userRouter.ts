import Router from 'express'
import userControll from './userControll'
const userRouter = Router()

userRouter.get('/profile',userControll.profile)
userRouter.post('/set-info', userControll.setInfo)
userRouter.post('/sign-up', userControll.signUp)
userRouter.post('/login', userControll.login)
userRouter.get('/get-info-user', userControll.getInfoUser)
userRouter.get('/get-info-data', userControll.getInfoData)
userRouter.get(``, userControll.getForm) 
userRouter.get(`/style.css`, userControll.getCSS) 
userRouter.get(`/script.js`, userControll.getScript) 
userRouter.get(`/profile.js`, userControll.getProfile) 
userRouter.get(`/profile.css`, userControll.getProfileCSS) 


export default userRouter