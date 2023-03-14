import { Product } from "../models/product.js";
import { randomFnForProducts } from "../utils/utils.js";

export const getAllProducts = async(req, res) => {
    try{
        const products = await Product.find();
        const randomProductIndices = await randomFnForProducts(products.length);
        const randomProducts = randomProductIndices.map(index => products[index-1]);
        return res.json({ data: randomProducts });
    }catch(error){
        res.status(500).json("Error getting products");
    }
}