import express from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./router/index.routes.js";
config({ path: "./.env" });

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server on port ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(`Server error ${error}`);
});
