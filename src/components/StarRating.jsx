import { FaStar } from "react-icons/fa";

import "../styles/ProductInfos.css";

const StarRating = (props) => {
	const { rating, setRating, hover, setHover } = props;
	
	return (
		<div className="stars review-stars">
			{/* create an array with 5 places */}
			{[...Array(5)].map((star, index) => {
				const ratingValue = index + 1;
				return (
					<label key={index}>
						<input
							className="radio-stars"
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={() => setRating(ratingValue)}
						/>
						<FaStar
							className="star-icons"
							color={ratingValue <= (hover || rating) ? "#FF9529" : "#bbb6b2"}
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRating;
