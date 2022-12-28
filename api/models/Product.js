const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
    {
        title: {type: String, require: true},
        img: {type: String, require: true},
        price: {type: Number, required: true},
        category: {type: String, required: true}
    },
    { 
        timestamps: true 
    }
);

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;