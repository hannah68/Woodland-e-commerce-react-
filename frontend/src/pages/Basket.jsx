import { useEffect, useState, useContext } from "react";

import "../styles/Basket.css";
import { LOCAL_STORAGE } from "../utils/config";
import { StoreContext } from "../store.js";

import CartItem from "../components/CartItem";
import EmptyBasket from "../components/EmptyBasket";
import TotalCart from "../components/TotalCart";

const Basket = () => {
	const store = useContext(StoreContext);
	const [basketItems, setBasketItems] = useState([]);

	// get data from db=====================
	useEffect(() => {
		const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);

		const getBasketData = async () => {
			try {
				const res = await fetch(`http://localhost:5000/basket/${userId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
					},
				});
				const resData = await res.json();
				if (resData && resData.data && resData.data.items) {
					setBasketItems(resData.data.items);
				} else {
					console.log("Data not found");
				}
			} catch (err) {  console.log(err); }
		};

		if (userId) {
			getBasketData();
		}
	}, [store.state.shoppingCart]);

	return (
		<div className="shopping-cart">
			<h1>
				Shopping Cart <span>: {basketItems.length} items</span>
			</h1>
			{basketItems.length < 1 ? (
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
							{basketItems.map((item, index) => {
								return <CartItem key={index} item={item} />;
							})}
						</div>
					</div>
					<TotalCart />
				</>
			)}
		</div>
	);
};

export default Basket;
