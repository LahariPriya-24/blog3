import mongoose from "mongoose";

const authSchema=new mongoose.Schema({
    username: {
        type: String,
    },
    dob:{
        type:Date,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    location:{
        type: String
    },
    password: {
        type:String,
    },


});
const authModel=mongoose.model("users",authSchema);
export default authModel;