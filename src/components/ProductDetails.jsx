import React from "react";
import { Link } from "react-scroll";

import CarouselImages from "./CarouselImages";
import ProductInfo from "./ProductInfo";

import { randomStar, starIcons, randomReviewNum } from "../utils";

const ProductDetails = (props) => {
	const { product, addToBasketHandler, quantityHandler, quantity } = props;

	return (
		<section className="product-item">
			<div className="productImg-container">
				<img src={`.${product.img}`} alt={product.title} />
				<CarouselImages />
			</div>
			<div className="productInfo-container">
				<h2 className="productInfo-title">{product.title}</h2>
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
				<h3 className="productInfo-price">£{product.price}</h3>
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
						onClick={() => addToBasketHandler(product)}
					>
						Add to basket
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
