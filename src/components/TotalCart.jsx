import { GrDeliver } from "react-icons/gr";
import { BsShop } from "react-icons/bs";
import { useContext } from "react";
import { StoreContext } from "../store";

const TotalCart = (props) => {
	const { total } = props;
	const store = useContext(StoreContext);

	return (
		<>
			<div className="delivery-container">
				<div className="delivery-section">
					<div className="delivery">
						<p>
							<span className="delivery-icon">
								<GrDeliver />
							</span>
							<span>Home Delivery available</span>
						</p>
						<p>
							<span className="delivery-icon">
								<BsShop />
							</span>
							<span>
								Click & Collect not available (only available when all order
								items are small)
							</span>
						</p>
					</div>
					<p className="delivery-price">£39</p>
				</div>
				<div className="total-section">
					<p>{`Subtotal (${store.state.shoppingCart.length} item)`}</p>
					<p>£{total}</p>
				</div>
			</div>
			<div className="checkout-btn">Go to checkout</div>
		</>
	);
};

export default TotalCart;
