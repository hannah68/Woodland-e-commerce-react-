import { AiOutlineLike } from "react-icons/ai";
import { useContext } from 'react';

import { StoreContext } from "../store";

import Review from "./Review";

import {dummyReview } from "../utils/utils";

import '../styles/ProductInfos.css';

const DummyReview = ({ isSubmitReviewForm }) => {
	const store = useContext(StoreContext);

	return (
		<div className="review-section">
			{ dummyReview.map((el, index) => {
				return (
					<div className="review" key={index}>
						<div className="review-header">
							<p className="review-header-name">{el.name}</p>
							<p className="review-header-star">
								{el.star.map((star, index) => (
									<span key={index}>{star}</span>
								))}
							</p>
							<p className="review-header-date">{el.date}</p>
						</div>
						<div className="review-body">
							<img
								src={`.${store.state.product.img}`}
								alt="furniture"
								className="review-body-img"
							/>
							<p className="review-body-text">{el.feedback}</p>
							<button className="review-body-btn">
								<span>
									<AiOutlineLike className="likeStyle" />
								</span>
								helpful
							</button>
						</div>
					</div>
				);
			})}

			{ isSubmitReviewForm && <Review /> }
		</div>
	);
};

export default DummyReview;
