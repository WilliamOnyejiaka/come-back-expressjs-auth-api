import {mongoose} from "./models";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_at:{
        type:String,
    },
    updated_at:{
        type:String,
    }
});

const User = mongoose.model("Users",UserSchema);

export default User;