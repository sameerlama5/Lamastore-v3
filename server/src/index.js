const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./database/mongoo");
require("dotenv").config();
const userRouter = require('./router/user')
const productRouter = require('./router/product')
const categoriestRouter = require('./router/categories')
const cartRouter = require('./router/cart')

// Connect to databases
connectMongoDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies
  })
);
app.use(express.raw({ type: "application/json" }));


app.use(userRouter)
app.use(productRouter)
app.use(categoriestRouter)
app.use(cartRouter)

// Set port with fallback if the environment variable is not set
const PORT = process.env.MY_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});