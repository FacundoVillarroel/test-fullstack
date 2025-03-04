const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db");
const ProductsRouter = require("./src/routes/productsRouter");

const PORT = process.env.PORT || 8080;

const app = express();

//DB connection
connectDB();

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log("method:", req.method, "path:", req.path);
  next();
});

//routes
app.use("/api/products", ProductsRouter);

app.listen(PORT, () => {
  console.log("App listening on port: ", PORT);
});
