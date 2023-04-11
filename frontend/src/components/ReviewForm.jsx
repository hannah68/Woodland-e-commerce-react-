import { FaUser, FaPen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useContext } from "react";

import StarRating from "./StarRating";
import { starMaking } from "../utils/utils";
import { StoreActions, StoreContext } from "../store";

const ReviewForm = ({ setIsSubmitReviewForm }) => {
	const store = useContext(StoreContext);

	// reviewer change handler =================================
	const changeHandler = (e) => {
		const { name, value } = e.target;
		const reviewInfo = store.state.reviewInfo;

		store.dispatch({ 
			type: StoreActions.UPDATE_REVIEWINFO, 
			payload: { ...reviewInfo, [name]: value }
		});
	};

	// submit review ==========================================
	const submitReviewFormHandler = (e) => {
		e.preventDefault();
		let today = new Date().toLocaleDateString();

		if (today && store.state.rating) {
			const reviewInfo = store.state.reviewInfo;
			const starArr = starMaking(store.state.rating);

			store.dispatch({ 
				type: StoreActions.UPDATE_REVIEWINFO, 
				payload: { ...reviewInfo, date: today, stars: starArr }
			})
		}

		setIsSubmitReviewForm(true);
	};

	return (
		<form className="review-form" onSubmit={ submitReviewFormHandler }>
			<div className="review-container">
				<p className="review-title">Your personal info.</p>
				<div className="user-name">
					<span>
						<FaUser />
					</span>
					<input
						type="text"
						className="user-input"
						placeholder="Enter your name"
						name="reviewerName"
						value={ store.state.reviewInfo.reviewerName }
						onChange={ changeHandler }
					/>
				</div>
				<div className="user-email">
					<span>
						<MdEmail />
					</span>
					<input
						type="email"
						className="user-input"
						name="reviewerEmail"
						placeholder="Enter your email"
						value={ store.state.reviewInfo.reviewerEmail }
						onChange={ changeHandler }
					/>
				</div>
				<div className="rating">
					<p>Rate our overall services.</p>
					<StarRating/>
				</div>

				<div className="feedback">
					<p className="feedback-text">Write your feedback.</p>
					<div className="user-text-review">
						<span>
							<FaPen />
						</span>
						<textarea
							name="feedback"
							value={ store.state.reviewInfo.feedback }
							onChange={ changeHandler }
						></textarea>
					</div>
				</div>

				<button type="submit" className="review-btn">
					Submit
				</button>
			</div>
		</form>
	);
};

export default ReviewForm;
