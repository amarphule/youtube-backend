import dotenv from "dotenv";
import connectionDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT;

connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed o connect port: ${port},Error: ${error}`);
  });
