import { config } from "dotenv";

config();

export default function envConfigs(key: string) {
    
    return {
        MONGODB_URI: process.env.MONGODB_URI!,
        PORT: process.env.PORT!,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    }[key];
}
