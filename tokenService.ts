import jwt from 'jsonwebtoken'
import { Token } from './userModel'
import error from "http-errors"
import {UserDTO} from './userDTO';
class TokenService {
    generateToken(payload: any) {
        // console.log('+++++++++++++++',payload)
        return jwt.sign(payload, 'privateKey', { expiresIn: '1h' });
    }

    async saveToken(token_:string){
        // console.log(token_)
        if(!token_){
            throw error(400, 'No founded token')
        }
        const token = await Token.create({token: token_})
        
    }

    verifyToken(token: string){
        
        const payload = new UserDTO(jwt.verify(token, 'privateKey'))
        if (!payload){
            throw error(400, 'Token is not valid')
        }
        return payload
    }
}

export default new TokenService()