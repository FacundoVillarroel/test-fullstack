const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log("App listening on port: ", PORT);
});
