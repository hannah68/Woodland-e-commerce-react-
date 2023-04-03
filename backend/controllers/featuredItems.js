import { Product } from '../models/product.js';
import { HTTP_RESPONSE } from "../utils/config.js";

export const getFeaturedItems = async(req, res) => {
    try{
        const featuredItems = await Product.find({ feature: true });
        res.status(HTTP_RESPONSE.OK.CODE).json({ data: featuredItems });
    }catch{
        res.status(500).json("Error finding featured products");
    }
}