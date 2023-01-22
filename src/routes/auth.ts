import express, { Router } from 'express';
import envConfigs from '../config/config';
import {Authentication} from './../controllers/controllers';
import {getBasicAuthHeader, validateBody, validateJWT} from './../middleware/middleware';

const auth:Router = Router(); 
const authController:Authentication = new Authentication();

auth.post("/sign-up",validateBody(['name','email','password']),authController.signUp);
auth.get("/login",getBasicAuthHeader,authController.login);
auth.get("/access-token",validateJWT(["refresh",envConfigs('REFRESH_TOKEN_SECRET') as string]),authController.getAccessToken);

export default auth;