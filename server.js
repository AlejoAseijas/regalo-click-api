const express = require("express");
const app = express();
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;
const appMiddleware = require("./src/middleware/index");

const server = app.listen(PORT, () => {
  console.log(`Server on port ${server.address().port}`);
});

app.use(appMiddleware);

server.on("error", (error) => {
  console.log(`Server error ${error}`);
});
