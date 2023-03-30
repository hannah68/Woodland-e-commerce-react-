import { Order } from "../models/order.js";


export const createOrder = async (req, res) => {
    try{
        const { userId, date, total } = req.body; 
        

        const order = await Order.create({
            userId, 
            date, 
            total
        })
        res.status(201).json({ success: true, data: order });
    }catch(error){
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}