import { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import "../styles/ProductInfos.css";

import ReviewForm from "../components/ReviewForm";
import DummyReview from "../components/DummyReview";
import ProductDetails from "../components/ProductDetails";
import { StoreActions, StoreContext } from "../store";

const ProductInfos = () => {
	const store = useContext(StoreContext);

	const [isSubmitReviewForm, setIsSubmitReviewForm] = useState(false);
	const [isReview, setIsReview] = useState(false);

	const location = useLocation();
	
	// use effect for accessing data from location=======================
	useEffect(() => {
		if (location.state) {
			const { item } = location.state;
			store.dispatch({type: StoreActions.UPDATE_PRODUCT, payload: item})
		}
		// eslint-disable-next-line
	}, [location]);

	
	// review handler ======================
	const writeReviewHandler = () => {
		setIsReview(!isReview);
	};

	return (
		<div className="product-info-section">
			<ProductDetails/>

			{isReview && (
				<div className="review-row">
					<DummyReview
						isSubmitReviewForm={isSubmitReviewForm}
					/>
					<ReviewForm
						setIsSubmitReviewForm={setIsSubmitReviewForm}
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
