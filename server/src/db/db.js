import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${uri}/${dbName}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed connection : ", error.message);
    }
}

export default connectDB;
