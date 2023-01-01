const Product = require("../models/Product.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) =>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log("error, product information could not be retrieved.");
       res.status(500).json(error);
    }
})


router.post("/add-product", async (req, res) =>{
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
       res.status(500).json(error);
    }
})

router.put("/update-product", async (req, res) =>{
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
        res.status(200).json("Item updated successfully.");
    } catch (error) {
        console.log("error, product information could not be updated.")
       res.status(500).json(error);
    }
})

router.delete("/delete-product", async (req, res) =>{
    try {
        await Product.findOneAndDelete({ _id: req.body.productId });
        res.status(200).json("Item deleted successfully.");
    } catch (error) {
        console.log("error, product deletion failed.");
       res.status(500).json(error);
    }
})

module.exports = router;