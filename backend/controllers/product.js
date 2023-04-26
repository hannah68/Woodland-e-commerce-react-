import { Product } from "../models/product.js";
import { randomFnForProducts } from "../utils/utils.js";
import { HTTP_RESPONSE } from "../utils/config.js";

// get all products=======================================
export const getAllProducts = async (req, res) => {
	try {
		if (Object.keys(req.query).length === 0) {
			const products = await Product.find();
			const randomProductIndices = randomFnForProducts(products.length);
			const randomProducts = randomProductIndices.map(
				(index) => products[index - 1]
			);
			return res.json({ data: randomProducts });
		} else {
			const colors = req.query.color?.split(",") || [];
			const categories = req.query.category?.split(",") || [];
			const collections = req.query.collection?.split(",") || [];
			const price = req.query.price ? Number(req.query.price) : null;

			const query = {};

			if (colors.length > 0) {
				query.color = { $in: colors };
			}

			if (categories.length > 0) {
				query.category = { $in: categories };
			}

			if (collections.length > 0) {
				query.collection_ = { $in: collections };
			}

			if (price !== null) {
				query.price = { $lt: price };
			}

			const products = await Product.find(query);
			return res.json({ data: products });
		}
	} catch (error) {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};

// get search value
export const getSearchValue = async (req, res) => {
	try {
		const { searchvalue } = req.params;
		const products = await Product.find({
			$or: [{ title: searchvalue }, { category: searchvalue }],
		});
		res.status(HTTP_RESPONSE.OK.CODE).json({ data: products });
	} catch (err) {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};
