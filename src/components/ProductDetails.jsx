import { Link } from "react-scroll";
import { useContext, useState, useEffect } from "react";

import CarouselImages from "./CarouselImages";
import ProductInfo from "./ProductInfo";

import {StoreContext, StoreActions} from '../store';
import { randomStar, starIcons, randomReviewNum } from "../utils";
import { APIEndPoints } from "../config";

const ProductDetails = () => {
	const store = useContext(StoreContext);
	const [isEdited, setIsEdited] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [quantity, setQuantity] = useState(0);


	// use effect for update quantity of product in basket================
	useEffect(() => {
		const updateBasketData = async () => {
			await fetch(`${APIEndPoints.basket}/${store.state.product.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...store.state.product, quantity: Number(quantity) + 1 }),
			});
		};

		if (isEdited) {
			updateBasketData();	
		}

		setIsEdited(false);
		setQuantity(0);

	}, [isEdited, store]);


	// use effect for posting data to basket===============================
	useEffect(() => {
		const postBasketData = async () => {
			await fetch(APIEndPoints.basket, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...store.state.product, quantity: Number(quantity) }),
			});
		};

		if (submit) {
			postBasketData();
			store.dispatch({
				type: StoreActions.SHOPPINGCARD, 
				payload: [
					...store.state.shoppingCart, 
					{ ...store.state.product, quantity: Number(quantity) }
				]
			});
			
		}
		
		setSubmit(false);
		setQuantity(0);
		// eslint-disable-next-line
	}, [submit, store.state.product]);

	

	// add item to basket handler ========================================
	const addToBasketHandler = () => {
		const product = store.state.product;
		const existedItem = store.state.shoppingCart.find((el) => el.id === product.id);

		if (existedItem) {
			store.dispatch({
				type: StoreActions.UPDATE_SHOPPINGCART, 
				payload: store.state.product
			});
			setIsEdited(true);
		} else {
			setSubmit(true);
		}
	};

	// quantity handler ====================
	const quantityHandler = (e) => {
		setQuantity(e.target.value);
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
						onChange={ quantityHandler }
					/>
					<button
						className="add-btn"
						onClick={ addToBasketHandler }
					>
						Add to basket
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
