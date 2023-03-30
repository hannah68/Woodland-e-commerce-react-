import { Product } from "../models/product.js";
import { seedProducts } from "../seeds/products.js";
import { HTTP_RESPONSE } from "../utils/config.js";

// seed product data
export const seedProductDB = async (req, res) => {
    try{
        const products = await Product.insertMany(seedProducts);
        console.log('Products inserted into DB', products);
        res.status(HTTP_RESPONSE.OK.CODE).json("Database seeded successfully")
    }catch(err){
        res.status(500).json("Error seeding database");
    }
}

