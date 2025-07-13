import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
