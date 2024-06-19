import dotenv from "dotenv";
import connectionDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;

connectionDB()
  .then(() => {
    console.log(`Server is running on port: ${PORT}`);
  })
  .catch((error) => {
    console.log(`Failed o connect port: ${port},Error: ${error}`);
  });
