import mongoose from "mongoose";
const connectToMongo = async () =>{
    const res= await mongoose.connect("mongodb+srv://lahari:lahari123@cluster0.tydxmrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    if (res){
        console.log("Connected Succesfully");
    }
};
export default connectToMongo;
