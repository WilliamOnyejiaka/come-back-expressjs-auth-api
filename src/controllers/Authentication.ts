import { Request,Response,NextFunction } from "express";
import { Validator,Serializer } from "./../modules/modules";
import bcrypt from 'bcrypt';
import User from "../models/Users";
import envConfigs from "../config/config";
import jsonwebtoken from 'jsonwebtoken';

export default class Authentication {

    public async signUp(req:Request,res:Response,next:NextFunction){
        const [name, email, password] = [
            req.body.name,
            req.body.email,
            req.body.password,
        ];
        const validator:Validator = new Validator();

        if(password.length < 5){
            return res.status(400).json({
                error: true,
                message: "password length must be greater than 4",
            });
        }
        
        if(!validator.emailValidator(email)){
            return res.status(400).json({
                error:true,
                message:"email is not valid"
            });
        }
        const emailExits = await User.findOne({email:email});
        if(!emailExits) {
            const passwordHash = await bcrypt.hash(password,10);
            const user = new User({
                name:name,
                email:email,
                password:passwordHash
            });

            try {
                user.save();
                return res.status(200).json({
                    error:false,
                    message:"user added successfully"
                });
            }catch(error) {
                return res.status(500).json({
                    error:true,
                    message:"something went wrong"
                });
            }
        }

        return res.status(400).json({
            error:true,
            message:"email already exits"
        });
    }

    public async login(req:Request,res:Response,next:NextFunction) {
        const [email, password]  = [res.locals.email,res.locals.password];
        const user = await User.findOne({email:email});
        if(user) {
            const validPassword = await bcrypt.compare(password,user.password);
            if(validPassword){
                const accessToken = jsonwebtoken.sign(
                    {id:user._id,type:"access"},
                    envConfigs('ACCESS_TOKEN_SECRET') as string,
                    {expiresIn:'1h'}
                );

                const refreshToken = jsonwebtoken.sign(
                    {id:user._id,type:"refresh"},
                    envConfigs('REFRESH_TOKEN_SECRET') as string,
                    {expiresIn:'30d'}
                );
                
                return res.status(200).json({
                    error:false,
                    user:(new Serializer(['_id','name','email'])).serialize(user),
                    tokens:{
                        accessToken:accessToken,
                        refreshToken:refreshToken
                    }
                });
            }
            return res.status(400).json({
                error:true,
                message:"invalid password"
            });
        }

        return res.status(404).json({
            error:true,
            message:"email does not exit"
        });
    }

    public async getAccessToken(req:Request,res:Response,next:NextFunction){
        const userId = res.locals.id;
        const userExits = await User.findById(userId);
        if(userExits){
            const accessToken = jsonwebtoken.sign(
                {id:userId,type:"access"},
                envConfigs("ACCESS_TOKEN_SECRET") as string,
                {expiresIn:'1h'}
            );
            return res.status(200).json({
                error:false,
                accessToken:accessToken
            });
        }

        return res.status(404).json({
            error:true,
            message:"user not found"
        });
    }
}