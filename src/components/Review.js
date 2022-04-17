import { AiOutlineLike } from "react-icons/ai";

import '../styles/ProductInfos.css';

const Review = (props) => {
	const { product, reviewInfo } = props;

	return (
		<div className="review-section" id="review">
			<div className="review">
				<div className="review-header">
					<p className="review-header-name">{reviewInfo.reviewerName}</p>
					<p className="review-header-star">
						{reviewInfo.stars.map((star, index) => (
							<span key={index}>{star}</span>
						))}
					</p>
					<p className="review-header-date">{reviewInfo.date}</p>
				</div>
				<div className="review-body">
					<img
						src={`.${product.img}`}
						alt={product.title}
						className="review-body-img"
					/>
					<p className="review-body-text">{reviewInfo.feedback}</p>
					<button className="review-body-btn">
						<span>
							<AiOutlineLike className="likeStyle"/>
						</span>
						helpful
					</button>
				</div>
			</div>
		</div>
	);
};

export default Review;
