import mongoose from "mongoose";
import envConfigs from './../config/config';
import Users from './Users';

const connectDB = async () => {
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(envConfigs('MONGODB_URI')!);
    }catch(err) {
        console.log(err);
    }
}

export {mongoose,connectDB,Users};