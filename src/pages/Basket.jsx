import { useEffect } from "react";

import { useContext } from "react";

import "../styles/Basket.css";
import { StoreContext, StoreActions } from "../store";
import { APIEndPoints } from "../config";

import CartItem from "../components/CartItem";
import EmptyBasket from "../components/EmptyBasket";
import TotalCart from "../components/TotalCart";

const Basket = () => {
	const store = useContext(StoreContext);

	// get data from basket (json server)=====================
	useEffect(() => {
		const getBasketData = async () => {
			const res = await fetch(APIEndPoints.basket);
			const data = await res.json();
			store.dispatch({ type: StoreActions.SHOPPINGCARD, payload: data });
		};
		getBasketData();
	}, []);

	return (
		<div className="shopping-cart">
			<h1>
				Shopping Cart <span>: {store.state.shoppingCart.length} items</span>
			</h1>
			{store.state.shoppingCart.length < 1 ? (
				<EmptyBasket />
			) : (
				<>
					<div className="cart-section">
						<div className="row header-row">
							<p className="header">product</p>
							<p className="header">Unit price</p>
							<p className="header">Quantity</p>
							<p className="header">Total</p>
						</div>
						<div className="cart">
							{store.state.shoppingCart.map((item, index) => {
								return (
									<CartItem
										key={index}
										item={item}
									/>
								);
							})}
						</div>
					</div>
					<TotalCart/>
				</>
			)}
		</div>
	);
};

export default Basket;
