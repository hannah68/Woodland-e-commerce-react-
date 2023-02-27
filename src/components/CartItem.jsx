import { FaPlus, FaMinus } from "react-icons/fa";

import "../styles/Basket.css";

import { starIcons, randomStar } from "../utils";

const CartItem = (props) => {
	const { item, addItem, removeItem } = props;

	return (
		<div className="row body-row">
			<div className="body-row-info">
				<img src={item.img} alt={item.title} />
				<div className="info-cart">
					<p>{item.title}</p>
					<div className="cart-stars">
						{starIcons.map((star, index) => {
							return <span key={index}>{star}</span>;
						})}
						<span>{randomStar()}</span>
					</div>
					<p className="delivery">Estimated dispatch within 5 working days</p>
				</div>
			</div>
			<p>£{item.price}</p>
			<div className="quantity-container">
				<button className="popup-plus" onClick={() => removeItem(item)}>
					<FaMinus />
				</button>
				<div className="quantity">{item.quantity}</div>
				<button className="popup-minus" onClick={() => addItem(item)}>
					<FaPlus />
				</button>
			</div>
			<p>£{(item.quantity * item.price).toFixed(2)}</p>
		</div>
	);
};

export default CartItem;
