import { Link } from "react-scroll";
import React, { useContext } from "react";

import CarouselImages from "./CarouselImages";
import ProductInfo from "./ProductInfo";
import {StoreContext} from '../store';
import { randomStar, starIcons, randomReviewNum } from "../utils";

const ProductDetails = (props) => {
	const { addToBasketHandler, quantityHandler, quantity } = props;

	const store = useContext(StoreContext);

	return (
		<section className="product-item">
			<div className="productImg-container">
				<img src={`.${store.state.product.img}`} alt={store.state.product.title} />
				<CarouselImages />
			</div>
			<div className="productInfo-container">
				<h2 className="productInfo-title">{store.state.product.title}</h2>
				<div className="stars">
					{starIcons.map((star, index) => {
						return <span key={index}>{star}</span>;
					})}
					<span>{randomStar()}</span>
					{/* react-scroll */}
					<Link to="review" spy={true} smooth={true} className="review-number">
						{randomReviewNum()}Reviews
					</Link>
				</div>
				<h3 className="productInfo-price">£{store.state.product.price}</h3>
				<ProductInfo />
				<div className="productInfo-select">
					<input
						type="number"
						name="num"
						className="num"
						value={quantity}
						onChange={quantityHandler}
					/>
					<button
						className="add-btn"
						onClick={() => addToBasketHandler(store.state.product)}
					>
						Add to basket
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
