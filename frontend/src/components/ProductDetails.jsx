import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PAGE_LINK } from "../utils/config.js";

import CarouselImages from "./CarouselImages";
import ProductInfo from "./ProductInfo";
import { LOCAL_STORAGE } from "../utils/config.js";

import {StoreContext, StoreActions} from '../store';
import { randomStar, starIcons, randomReviewNum } from "../utils/utils";

const ProductDetails = () => {
	const store = useContext(StoreContext);
	// const [isEdited, setIsEdited] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [quantity, setQuantity] = useState(0);
	
	let navigate = useNavigate();


	// use effect for posting data to db===============================
	useEffect(() => {
		const product = store.state.product;
		const shoppingCart = store.state.shoppingCart
		const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
		// if user logged in
		if(submit && userId){
			// trigger the POST request
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
			postBasketData()
			// reset the quantity after the item has been added to the basket
			setQuantity(0);
		}
		else if(submit){
			// if user hasn't logged in yet(guest)
			const existedItem = shoppingCart.find((el) => el.id === product.id);
			if(existedItem){
				store.dispatch({
					type: StoreActions.UPDATE_SHOPPINGCART, 
					payload: product
				});
			}else{
				store.dispatch({
					type: StoreActions.SHOPPINGCARD, 
					payload: product
				});
			}
			
		}

		// reset submit to false after the POST request is made
		setSubmit(false);
	}, [submit, store.state.product, quantity]);
	

	// add item to basket handler ========================================
	const addItemToBasketHandler = () => {
		setSubmit(true);
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
					<Link to="review" spy="true" smooth="true" className="review-number">
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
						onClick={ addItemToBasketHandler }>
						Add to basket
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
