import { User } from "./userModel"

class UserDTO {
    id: number
    email: string
    constructor(model: any){
        this.id = model.id
        this.email = model.email
    }
}

export {UserDTO}