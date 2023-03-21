import { Basket } from "../models/basket.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";

// post item to user's basket
export const addItemsToBasket = async (req, res) => {
	try {
		const { userId, quantity, productId } = req.body;

		// find the user's basket
		let basket = await Basket.findOne({ userId });

		// create new basket if not exist
		if (!basket) {
			basket = await Basket.create({
				userId,
				items: [{ productId, quantity }],
			});
		} else {
			// check if the item is in the basket already
			const foundItem = basket.items.find(
				(item) => item.productId === productId
			);

			if (foundItem) {
				// update the quantity of the existing item
				foundItem.quantity = Math.max(0, foundItem.quantity + quantity);

				// remove the item if the quantity is zero
				if (foundItem.quantity === 0) {
					basket.items = basket.items.filter(
						(item) => item.productId !== productId
					);
				}
			} else {
				// add the new item to the basket
				basket.items.push({ productId, quantity });
			}

			basket = await basket.save();
		}

		res.status(200).json({ data: basket });
	} catch (err) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// get items from the basket
export const getItemsFromBasket = async(req, res) => {
  try{
    // extract user id from URL parameter
    const { userId } = req.params;

    // Retrieve the user's basket from the database
    const basket = await Basket.findOne({ userId }).populate('items.productId');

    // Send the basket as the response
    res.status(200).json({data: basket});
  }catch(err){
    res.status(500).json({ error: 'Server error' });
  }
}
