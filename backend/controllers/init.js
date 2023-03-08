import { Product } from "../models/product";
import { seedProducts } from "../seeds/products";


const seedProductsFn = async () => {
    try{
        const products = await Product.insertMany(seedProducts);
        console.log('Products inserted into DB', products);
    }catch(err){
        console.log('productSeedsError', err);
    }
    
}

export const seedProductDB = async () =>{
    await seedProductsFn();
}