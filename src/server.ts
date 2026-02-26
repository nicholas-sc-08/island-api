import app from "./app.js";
import { configDotenv } from "dotenv";

configDotenv();

const port: number = Number(process.env.PORT);

app.listen(port, () => console.log(`Server running at ${port}`));