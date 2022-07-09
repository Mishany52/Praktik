import tokenService from "./tokenService"
import userService from "./userService"
class UserController {
    async getInfo(request: any, response: any, next: any){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async setInfo(request: any, response: any, next: any){
        try {
            // получаем широту и долготу
            const { latitude, longitude } = request.body
            // получаем токен из cookie
            let token = request.cookies.token
            //сверяем токен и получаем юзера с id 
            
            // console.log(user)
            //заполняем профиль данными
            const profile = await userService.setInfo(token, latitude, longitude)
            token = tokenService.generateToken({...profile})
            await tokenService.saveToken(token)

            response.cookie('token', token, { maxAge: 900000, httpOnly: true })
            // response.json(profile).status(200)
        } catch (error) {
            next(error)
        }
    }

    async signUp(request: any, response: any, next: any){
        try {
            const {email, password} = request.body
            await userService.signUp(email, password)
            response.json().status(200)

        } catch (error) {
            next(error)
        }
    }

    async login(request: any, response: any, next: any){
        try {
            const {email, password} = request.body
            const userData = await userService.login(email, password)
            if (userData != undefined){
                response.cookie('token', userData.token, { maxAge: 900000, httpOnly: true })
            }

            response.json(userData).status(200)
        } catch (error) {
            next(error)
            
        }
    }
}
export default new UserController