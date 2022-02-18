import express from "express";
import { config } from "dotenv";
config({ path: "./.env" });
const PORT = process.env.PORT;

const app = express();

const server = app.listen(PORT, () => {
  console.log(`Server on port ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(`Server error ${error}`);
});
