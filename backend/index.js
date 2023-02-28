const express = require("express");
const app = express();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

//connecting to mongo server
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected!"))
  .catch((error) => {
    console.log(error);
  });


app.use(cors());
//helps to take json object input from the user
app.use(express.json());
// routing
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
// localhost:4000/api/user/usertest
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// use port from .env file or if there is no port then use port 5000
app.listen(process.env.PORT || 5000, () => {
  console.log("backend server running...");
});
