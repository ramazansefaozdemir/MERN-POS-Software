const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const port = 5001;

dotenv.config()

// routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongoDB")
    } catch (error) {
        throw error
    }
}

//middlewares
    //app.get("/", (req, res) => res.send("Hello World!"))
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);

app.listen(port, ()=>{
    connect();
    console.log(`example app listening on port ${port}`)
})