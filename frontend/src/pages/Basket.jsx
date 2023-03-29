import { useEffect, useContext, useCallback } from "react";
// import { useDispatch } from 'react-redux';

import "../styles/Basket.css";
import { LOCAL_STORAGE } from "../utils/config";

import CartItem from "../components/CartItem";
import EmptyBasket from "../components/EmptyBasket";
import TotalCart from "../components/TotalCart";
import { StoreContext, StoreActions } from "../store";
// import { store } from '../store';

const Basket = () => {
	const store = useContext(StoreContext);
	// const dispatch = useDispatch();

	const getBasketData = useCallback(async () => {
		try {
			const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
			const res = await fetch(`http://localhost:5000/basket/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
				},
			});
			const resData = await res.json();
			
			if (resData && resData.data && resData.data.items) {
				store.dispatch({ 
					type: StoreActions.BASKETITEMS, payload: resData.data.items 
				});
			} else {
				console.log("Data not found");
			}
		} catch (err) {  console.log(err); }
	}, []);

	// get data from db=====================
	useEffect(() => {
		const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);

		if (userId) {
			getBasketData();
		}
	}, [getBasketData]);

	return (
		<div className="shopping-cart">
			<h1>
				Shopping Cart <span>: {store.state.basketItems.length} items</span>
			</h1>
			{store.state.basketItems.length < 1 ? (
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
							{store.state.basketItems.map((item, index) => {
								return <CartItem 
									key={index} 
									item={item} 
								/>;
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
