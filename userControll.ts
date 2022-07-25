import tokenService from "./tokenService"
import userService from "./userService"
import { User } from "./userModel";
import path from "path"
import axios from "axios"
class UserController {
    async profile(request: any, response: any, next: any){
            // console.log(__dirname)
            let dir = __dirname.split('/')
            let pa = ''
            var i = 0
            for (let d in dir){
                i++ 
                if(i != dir.length-1){
                pa += '/' + dir[i]}
                else{break}}
            response.sendFile(path.join( pa + '/Work2/front/profile.html')) // Прикрепили файл к ответу сервера
    }

    async getInfoUser(request: any, response: any, next: any){
        try {
            let token = request.cookies.token
            const userInfo = await userService.getInfo(token)
            response.json(userInfo).status(200)
        } catch (error) {
            next(error)
        }
    }

    async getInfoData(request: any, response: any, next: any){
        try {
            let req = axios.get('https://geotest.eticum.com/v1/ll/get')
            let data = (await req).data.data
            response.json(data).status(200)
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
            // console.log(email, password)
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

    async getForm(request: any, response: any, next: any) {
        // response.json(`Hello ${request.query.name} Monkey`).status(200)
        //Получаем путь в котором находиться index.html
        let dir = __dirname.split('/')
        let pa = ''
        var i = 0
        for (let d in dir){
            i++ 
            if(i != dir.length-1){
            pa += '/' + dir[i]}
            else{break}}
        response.sendFile(path.join( pa + '/Work2/front/index.html')) // Прикрепили файл к ответу сервера
        
    } 

    async getCSS(request: any, response: any, next: any) {
        // console.log(__dirname)
        //Получаем путь в котором находиться index.html
        let dir = __dirname.split('/')
        let pa = ''
        var i = 0
        for (let d in dir){
            i++ 
            if(i != dir.length-1){
            pa += '/' + dir[i]}
            else{break}}
        response.sendFile(path.join( pa + '/Work2/front/style.css'))
    }
    async getScript(request: any, response: any, next: any){
        //Получаем путь в котором находиться index.html
        let dir = __dirname.split('/')
        let pa = ''
        var i = 0
        for (let d in dir){
            i++ 
            if(i != dir.length-1){
            pa += '/' + dir[i]}
            else{break}}
        response.sendFile(path.join( pa + '/Work2/front/script.js')) // Прикрепили файл к ответу сервера
    }

    async getProfile(request: any, response: any, next: any){
        //Получаем путь в котором находиться index.html
        let dir = __dirname.split('/')
        let pa = ''
        var i = 0
        for (let d in dir){
            i++ 
            if(i != dir.length-1){
            pa += '/' + dir[i]}
            else{break}}
        response.sendFile(path.join( pa + '/Work2/front/profile.js')) // Прикрепили файл к ответу сервера
    }
    async getProfileCSS(request: any, response: any, next: any){
        //Получаем путь в котором находиться index.html
        let dir = __dirname.split('/')
        let pa = ''
        var i = 0
        for (let d in dir){
            i++ 
            if(i != dir.length-1){
            pa += '/' + dir[i]}
            else{break}}
        response.sendFile(path.join( pa + '/Work2/front/profile.css')) // Прикрепили файл к ответу сервера
    }
}
export default new UserController