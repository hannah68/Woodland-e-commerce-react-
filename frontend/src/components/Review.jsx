import { AiOutlineLike } from "react-icons/ai";
import { useContext } from 'react';

import { StoreContext } from "../store";

import '../styles/ProductInfos.css';

const Review = () => {
	const store = useContext(StoreContext);

	return (
		<div className="review-section" id="review">
			<div className="review">
				<div className="review-header">
					<p className="review-header-name">
						{store.state.reviewInfo.reviewerName}
					</p>
					<p className="review-header-star">
						{store.state.reviewInfo.stars.map((star, index) => (
							<span key={ index }>{ star }</span>
						))}
					</p>
					<p className="review-header-date">
						{ store.state.reviewInfo.date }
					</p>
				</div>
				<div className="review-body">
					<img
						src={ store.state.product.img }
						alt={ store.state.product.title }
						className="review-body-img"
					/>
					<p className="review-body-text">
						{ store.state.reviewInfo.feedback }
					</p>
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
