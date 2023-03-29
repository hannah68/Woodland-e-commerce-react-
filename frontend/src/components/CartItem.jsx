import { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { FaPlus, FaMinus } from "react-icons/fa";
import { StoreContext, StoreActions } from "../store";
import { starIcons, randomStar } from "../utils/utils";
import { APIEndPoints, PAGE_LINK } from "../utils/config";
import { LOCAL_STORAGE } from "../utils/config.js";

import "../styles/Basket.css";

const CartItem = ({ item }) => {
	
	const store = useContext(StoreContext);
	let navigate = useNavigate();


	// delete item from json server============================
	// useEffect(() => {
	// 	const deleteItemFromBasket = async () => {
	// 		await fetch(`${APIEndPoints.basket}/${deletedItem.id}`, {
	// 			method: "DELETE",
	// 		});
	// 		navigate(PAGE_LINK.basket, { replace: true });
	// 	};

	// 	if (deletedItem) {
	// 		deleteItemFromBasket();
	// 		store.dispatch({ type: StoreActions.FILTER_SHOPPINGCART, payload: deletedItem});
	// 	}
	// 	setDeletedItem(null);
	// }, [deletedItem, navigate]);

	const updateBasketData = async (quantity, productId) => {
		
		await fetch(`http://localhost:5000/basket/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN),
			},
			body: JSON.stringify({
				productId,
				userId: localStorage.getItem(LOCAL_STORAGE.USER_ID), 
				quantity
			}),
		});

		// if the quantity is zero or less, remove the item from basket
		if(quantity <= 0 ){
			const updatedItems = store.state.basketItems.filter((item) =>
				item.productId._id !== productId 
			);
			store.dispatch({ type: StoreActions.BASKETITEMS, payload: updatedItems });

		}else{
			// update the quantity of the item in the state
			const updatedItems = store.state.basketItems.map((item) =>
				item.productId._id === productId ? { ...item, quantity } : item
			);
			store.dispatch({ type: StoreActions.BASKETITEMS, payload: updatedItems });
		}
	};

	// add more items to cart ================================
	const addItem = (item) => {
		const quantity = Number(item.quantity) + 1;
		const productId = item.productId._id;
		
		updateBasketData(quantity, productId);
	};


	// remove items from cart==================================
	const removeItem = (item) => {
		const quantity = Number(item.quantity) - 1;
		const productId = item.productId._id;
	
		updateBasketData(quantity, productId);
	};


	return (
		<div className="row body-row">
			<div className="body-row-info">
				<img src={item.productId? item.productId.img : item.img} 
				alt={item.productId? item.productId.title: item.title} />
				<div className="info-cart">
					<p>{item.productId ? item.productId.title : item.title}</p>
					<div className="cart-stars">
						{starIcons.map((star, index) => {
							return <span key={index}>{star}</span>;
						})}
						<span>{randomStar()}</span>
					</div>
					<p className="delivery">Estimated dispatch within 5 working days</p>
				</div>
			</div>
			<p>£{item.productId ? item.productId.price: item.price}</p>
			<div className="quantity-container">
				<button className="popup-plus" onClick={() => removeItem(item)}>
					<FaMinus />
				</button>
				<div className="quantity">{ item.quantity }</div>
				<button className="popup-minus" onClick={() => addItem(item)}>
					<FaPlus />
				</button>
			</div>
			<p>£{Number(item.quantity * item.productId.price).toFixed(2)}</p>
		</div>
	);
};

export default CartItem;
