import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import "../styles/Basket.css";
import { StoreContext, StoreActions } from "../store";
import { APIEndPoints, PAGE_LINK } from "../config";

import CartItem from "../components/CartItem";
import EmptyBasket from "../components/EmptyBasket";
import TotalCart from "../components/TotalCart";

const Basket = () => {
	const store = useContext(StoreContext);
	const [deletedItem, setDeletedItem] = useState(null);
	const [total, setTotal] = useState(0);
	const [isEdited, setIsEdited] = useState(false);
	let navigate = useNavigate();

	// get data from basket (json server)=====================
	useEffect(() => {
		const getBasketData = async () => {
			const res = await fetch(APIEndPoints.basket);
			const data = await res.json();
			store.dispatch({type: StoreActions.SHOPPINGCARD, payload: data})
		};
		getBasketData();
	}, []);

	// add more items to cart ================================
	const addItem = (item) => {
		const foundItem = store.state.shoppingCart.find((el) => el.id === item.id);
		if (foundItem) {
			store.dispatch({type: StoreActions.ADDMOREITEM_TOBASKET, payload: item})
			setIsEdited(true);
		} 
		setIsEdited(true);
	};

	// remove items from cart==================================
	const removeItem = (item) => {
		const foundItem = store.state.shoppingCart.find((el) => el.id === item.id);
		if (foundItem.quantity > 1) {
			store.dispatch({type: StoreActions.REMOVEITEM_FROMBASKET, payload:item})
			setIsEdited(true);
		} 
		else if (foundItem.quantity <= 1) {
			store.dispatch({type: StoreActions.FILTER_SHOPPINGCART, payload: item})
			setDeletedItem(foundItem);
		}
	};

	// use effect for updating basket quantity======================
	useEffect(() => {
		const updateBasketData = async () => {
			await fetch(`${APIEndPoints.basket}/${store.state.product.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(store.state.product),
			});
		};
		if (isEdited) {
			updateBasketData();
		}
		setIsEdited(false);
	}, [isEdited, store.state.product]);

	// update total============================================
	useEffect(() => {
		if (store.state.shoppingCart.length >= 1) {
			const priceQty = store.state.shoppingCart.map((el) => el.price * Number(el.quantity));
			const total = priceQty.reduce((acc, curr) => acc + curr).toFixed(2);
			setTotal(total);
		}
	}, [store.state.shoppingCart]);

	// delete item from json server============================
	useEffect(() => {
		const deleteItemFromBasket = async () => {
			await fetch(`${APIEndPoints.basket}/${deletedItem.id}`, {
				method: "DELETE",
			});
			navigate(PAGE_LINK.basket, { replace: true });
		};
		if (deletedItem) {
			deleteItemFromBasket();
		}
	}, [deletedItem, navigate]);

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
										removeItem={removeItem}
										addItem={addItem}
									/>
								);
							})}
						</div>
					</div>
					<TotalCart total={total} />
				</>
			)}
		</div>
	);
};

export default Basket;
