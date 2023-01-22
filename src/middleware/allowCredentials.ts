import { Response,NextFunction } from "express"

const allowCredentials = (req:any,res:Response,next:NextFunction) => {
    req.header('Access-Control-Allow-Credentials',true);
    next();
}

export default allowCredentials;