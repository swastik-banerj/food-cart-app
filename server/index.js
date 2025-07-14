import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

dotenv.config({
    path: "./.env"
});


connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`);
        });
    })
