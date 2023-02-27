import { AiOutlineLike } from "react-icons/ai";

import Review from "./Review";

import {dummyReview } from "../utils";

import '../styles/ProductInfos.css';

const DummyReview = (props) => {
	const { product, isSubmitReviewForm, reviewInfo } = props;

	return (
		<div className="review-section">
			{dummyReview.map((el, index) => {
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
								src={`.${product.img}`}
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

			{isSubmitReviewForm && (
				<Review reviewInfo={reviewInfo} product={product} />
			)}
		</div>
	);
};

export default DummyReview;
