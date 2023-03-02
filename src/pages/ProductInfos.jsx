import { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { APIEndPoints } from "../config";

import "../styles/ProductInfos.css";

import ReviewForm from "../components/ReviewForm";
import DummyReview from "../components/DummyReview";
import ProductDetails from "../components/ProductDetails";
import { StoreActions, StoreContext } from "../store";

export const initialReviewInfos = {
	reviewerName: "",
	reviewerEmail: "",
	stars: [],
	feedback: "",
	date: "",
};

const ProductInfos = () => {
	const store = useContext(StoreContext);

	const [submit, setSubmit] = useState(false);
	const [isEdited, setIsEdited] = useState(false);
	const [isSubmitReviewForm, setIsSubmitReviewForm] = useState(false);

	const [quantity, setQuantity] = useState(0);

	const [isReview, setIsReview] = useState(false);
	const [reviewInfo, setReviewInfo] = useState(initialReviewInfos);
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);

	const location = useLocation();

	// use effect for accessing data from location=======================
	useEffect(() => {
		if (location.state) {
			const { item } = location.state;
			store.dispatch({type: StoreActions.UPDATE_PRODUCT, payload: item})
		}
	}, [location]);

	// use effect for update quantity of product in basket================
	useEffect(() => {
		const updateBasketData = async () => {
			await fetch(`${APIEndPoints.basket}/${store.state.product.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(store.state.product),
			});
		};
		if (isEdited) {
			updateBasketData();
		}
		setIsEdited(false);
	}, [isEdited, store]);

	// use effect for posting data to basket===============================
	useEffect(() => {
		const postBasketData = async () => {
			await fetch(APIEndPoints.basket, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...store.state.product, quantity: quantity }),
			});
		};
		if (submit) {
			postBasketData();
		}
		setSubmit(false);
		setQuantity(0);
		// eslint-disable-next-line
	}, [submit, store.state.product]);

	// add item to basket handler ========================================
	const addToBasketHandler = (product) => {
		const existedItem = store.state.shoppingCart.find((el) => el.id === product.id);
		if (existedItem) {
			store.dispatch({type: StoreActions.UPDATE_SHOPPINGCART, payload: {product, quantity}})
			setIsEdited(true);
		} else {
			setSubmit(true);
		}
	};

	// quantity handler ====================
	const quantityHandler = (e) => {
		setQuantity(e.target.value);
	};

	// review handler ======================
	const writeReviewHandler = () => {
		setIsReview(!isReview);
	};

	return (
		<div className="product-info-section">
			<ProductDetails
				addToBasketHandler={addToBasketHandler}
				quantityHandler={quantityHandler}
				quantity={quantity}
			/>

			{isReview && (
				<div className="review-row">
					<DummyReview
						isSubmitReviewForm={isSubmitReviewForm}
						reviewInfo={reviewInfo}
					/>
					<ReviewForm
						setReviewInfo={setReviewInfo}
						reviewInfo={reviewInfo}
						setIsSubmitReviewForm={setIsSubmitReviewForm}
						isSubmitReviewForm={isSubmitReviewForm}
						rating={rating}
						setRating={setRating}
						hover={hover}
						setHover={setHover}
					/>
				</div>
			)}

			<div className="review-btn-container">
				<button onClick={writeReviewHandler} id="review">
					Write a review
					<FaChevronRight className="btnStyle" />
				</button>
			</div>
		</div>
	);
};

export default ProductInfos;
