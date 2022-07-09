import sequelize from "./pool";
import {DataTypes, Model} from "sequelize"

class User extends Model{
    declare id: number
    declare email: string
    declare password: string
    declare latitude: number
    declare longitude: number
    declare createdAt: Date
    declare updatedAt: Date  
}


User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        latitude:{
            type:DataTypes.REAL,
            defaultValue: null
        },
        longitude:{
            type:DataTypes.REAL,
            defaultValue: null
        }
    },
    {
        sequelize,
        modelName: "user"
    }
)

class Token extends Model {
    declare token: string
}

Token.init(
    {
        id:{
           type:DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement: true, 
        },
        token:
        {
            type:DataTypes.STRING,
        },
        
    
    },
    {
        sequelize,
        modelName:'tokens',
        timestamps: false

    }
)

export {User, Token}