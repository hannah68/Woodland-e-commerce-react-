import { Link } from "react-scroll";
import { useContext, useState, useEffect } from "react";

import CarouselImages from "./CarouselImages";
import ProductInfo from "./ProductInfo";
import { LOCAL_STORAGE } from "../utils/config.js";

import {StoreContext} from '../store';
import { randomStar, starIcons, randomReviewNum } from "../utils/utils";

const ProductDetails = () => {
	const store = useContext(StoreContext);
	const [isEdited, setIsEdited] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [quantity, setQuantity] = useState(0);


	// use effect for update quantity of product in basket================
	// useEffect(() => {
	// 	const updateBasketData = async () => {
	// 		await fetch(`${APIEndPoints.basket}/${store.state.product._id}`, {
	// 			method: "PATCH",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ ...store.state.product, quantity: Number(quantity) + 1 }),
	// 		});
	// 	};

	// 	if (isEdited) {
	// 		updateBasketData();	
	// 	}

	// 	setIsEdited(false);
	// 	setQuantity(0);

	// }, [isEdited, store]);

	// use effect for posting data to db===============================
	useEffect(() => {
		const postBasketData = async () => {
			await fetch("http://localhost:5000/basket/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
				},
				body: JSON.stringify({
					productId: store.state.product._id,
					userId: localStorage.getItem(LOCAL_STORAGE.USER_ID), 
					quantity: Number(quantity)
				}),
			});
		};

		if (submit) {
			postBasketData();
		}
		
		// reset submit to false after the POST request is made
		setSubmit(false);
	}, [submit, store.state.product, quantity]);
	

	// add item to basket handler ========================================
	const addItemToBasketHandler = () => {
		// set submit to true to trigger the POST request
		setSubmit(true);
		// reset the quantity after the item has been added to the basket
		setQuantity(0);
	};


	return (
		<section className="product-item">
			<div className="productImg-container">
				<img src={`.${store.state.product.img}`} alt={store.state.product.title} />
				<CarouselImages />
			</div>
			<div className="productInfo-container">
				<h2 className="productInfo-title">{ store.state.product.title }</h2>
				<div className="stars">
					{starIcons.map((star, index) => {
						return <span key={ index }>{ star }</span>;
					})}
					<span>{randomStar()}</span>
					{/* react-scroll */}
					<Link to="review" spy={true} smooth={true} className="review-number">
						{ randomReviewNum() }Reviews
					</Link>
				</div>
				<h3 className="productInfo-price">£{ store.state.product.price }</h3>
				<ProductInfo />
				<div className="productInfo-select">
					<input
						type="number"
						name="num"
						className="num"
						value={ quantity }
						onChange={ (e) => setQuantity(e.target.value) }
					/>
					<button
						className="add-btn"
						onClick={ addItemToBasketHandler }
					>
						Add to basket
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
