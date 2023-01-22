import cors from 'cors';
import express ,{Application,Request,Response} from 'express';
import {allowCredentials} from './middleware/middleware';
import {auth} from './routes/routes';
import envConfigs from './config/config';
import { connectDB,mongoose } from './models/models';

const app:Application = express();
const PORT:string = envConfigs('PORT')!;

connectDB();

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
// app.use(allowCredentials);

app.use('/api/auth',auth);

app.get('/',(req:Request,res:Response) => {
    res.status(200).json({
        error:false,
        message:"Base url"
    });
});

mongoose.connection.once('open', () => {
    console.log("connected to database");
    
    app.listen(PORT, () => console.log(`server running on port - ${PORT}`));
});


