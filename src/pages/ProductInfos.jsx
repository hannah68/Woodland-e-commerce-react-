import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { APIEndPoints } from "../config";

import "../styles/ProductInfos.css";

import ReviewForm from "../components/ReviewForm";
import DummyReview from "../components/DummyReview";
import ProductDetails from "../components/ProductDetails";

export const initialReviewInfos = {
	reviewerName: "",
	reviewerEmail: "",
	stars: [],
	feedback: "",
	date: "",
};

const ProductInfos = (props) => {
	const { shoppingCart, setShoppingCart } = props;

	const [submit, setSubmit] = useState(false);
	const [isEdited, setIsEdited] = useState(false);
	const [isSubmitReviewForm, setIsSubmitReviewForm] = useState(false);

	const [product, setProduct] = useState({});
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
			setProduct(item);
		}
	}, [location]);

	// use effect for update quantity of product in basket================
	useEffect(() => {
		const updateBasketData = async () => {
			await fetch(`${APIEndPoints.basket}/${product.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			});
		};
		if (isEdited) {
			updateBasketData();
		}
		setIsEdited(false);
	}, [isEdited, product]);

	// use effect for posting data to basket===============================
	useEffect(() => {
		const postBasketData = async () => {
			await fetch(APIEndPoints.basket, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...product, quantity: quantity }),
			});
		};
		if (submit) {
			postBasketData();
		}
		setSubmit(false);
		setQuantity(0);
		// eslint-disable-next-line
	}, [submit, product]);

	// add item to basket handler ========================================
	const addToBasketHandler = (product) => {
		const existedItem = shoppingCart.find((el) => el.id === product.id);
		if (existedItem) {
			const updatedArr = shoppingCart.map((el) => {
				if (el.id === product.id) {
					setProduct({
						...el,
						quantity: Number(el.quantity) + Number(quantity),
					});
					return { ...el, quantity: Number(el.quantity) + Number(quantity) };
				} else {
					return el;
				}
			});
			setShoppingCart(updatedArr);
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
				product={product}
				addToBasketHandler={addToBasketHandler}
				quantityHandler={quantityHandler}
				quantity={quantity}
			/>

			{isReview && (
				<div className="review-row">
					<DummyReview
						product={product}
						isSubmitReviewForm={isSubmitReviewForm}
						reviewInfo={reviewInfo}
					/>
					<ReviewForm
						product={product}
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
