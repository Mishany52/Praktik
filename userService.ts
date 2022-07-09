import { User } from "./userModel";
import error from "http-errors"
import tokenService from "./tokenService";
import { UserDTO } from "./userDTO";

class UserService {
    //запись информации о мест. нахождении пользователя
    async setInfo(token: any, latitude: number, longitude: number){
        if (!token || !latitude || !longitude){
            throw error(400, "token or latitude or longitude Undefined")
        }
        const payload = tokenService.verifyToken(token)
        // console.log('----------------------------', payload)
        const user =  await User.findByPk(payload.id)
        if (!user){
            throw error(400, 'user Undefined')
        }
        user.latitude = latitude
        user.longitude = longitude
        
        await user.save()
        return new UserDTO(user)
    }

    async signUp(email: string, password: string){
        if (!email || !password){
            throw error(400, "email or password Undefined")
        }
         const user = await User.create({
            email: email,
            password: password
        })
    }

    async login(email: string, password: string){
        // console.log(email, password)
        if (!email || !password){
            throw error(400, "email or password Undefined")
        }
        const user = await User.findOne({
            where: {email: email}
        })
        if (!user){
            throw error(400, "user Undefined")
        }
        if (user.password != password){
            throw error(400, "passwords unequal")
        }
        
        const userDTO = new UserDTO(user)
        const token = tokenService.generateToken({...userDTO})
        // console.log(token)
        await tokenService.saveToken(token)
        return {user, token}
        
    }
}
export default new UserService()