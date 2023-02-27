import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Basket.css";

import { APIEndPoints, PAGE_LINK } from "../config";

import CartItem from "../components/CartItem";
import EmptyBasket from "../components/EmptyBasket";
import TotalCart from "../components/TotalCart";

const Basket = (props) => {
	const { setShoppingCart, shoppingCart } = props;
	const [deletedItem, setDeletedItem] = useState(null);
	const [total, setTotal] = useState(0);
	const [product, setProduct] = useState({});
	const [isEdited, setIsEdited] = useState(false);
	let navigate = useNavigate();

	// get data from basket (json server)=====================
	useEffect(() => {
		const getBasketData = async () => {
			const res = await fetch(APIEndPoints.basket);
			const data = await res.json();
			setShoppingCart(data);
		};
		getBasketData();
	}, [setShoppingCart]);

	// add more items to cart ================================
	const addItem = (item) => {
		const updatedArr = shoppingCart.map((el) => {
			if (el.id === item.id) {
				setProduct({ ...el, quantity: Number(el.quantity) + 1 });
				return { ...el, quantity: Number(el.quantity) + 1 };
			} else {
				return el;
			}
		});
		setShoppingCart(updatedArr);
		setIsEdited(true);
	};

	// remove items from cart==================================
	const removeItem = (item) => {
		const foundItem = shoppingCart.find((el) => el.id === item.id);
		if (foundItem.quantity > 1) {
			const updatedArr = shoppingCart.map((el) => {
				if (el.id === item.id) {
					setProduct({ ...el, quantity: Number(el.quantity) - 1 });
					return { ...el, quantity: Number(el.quantity) - 1 };
				} else {
					return el;
				}
			});
			setShoppingCart(updatedArr);
			setIsEdited(true);
		} else if (foundItem.quantity <= 1) {
			setShoppingCart(shoppingCart.filter((el) => el.id !== item.id));
			setDeletedItem(foundItem);
		}
	};

	// use effect for updating basket quantity======================
	useEffect(() => {
		const updateBasketData = async () => {
			await fetch(`${APIEndPoints.basket}/${product.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			});
		};
		if (isEdited) {
			updateBasketData();
		}
		setIsEdited(false);
	}, [isEdited, product]);

	// update total============================================
	useEffect(() => {
		if (shoppingCart.length >= 1) {
			const priceQty = shoppingCart.map((el) => el.price * Number(el.quantity));
			const total = priceQty.reduce((acc, curr) => acc + curr).toFixed(2);
			setTotal(total);
		}
	}, [shoppingCart]);

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
				Shopping Cart <span>: {shoppingCart.length} items</span>
			</h1>
			{shoppingCart.length < 1 ? (
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
							{shoppingCart.map((item, index) => {
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
					<TotalCart total={total} shoppingCart={shoppingCart} />
				</>
			)}
		</div>
	);
};

export default Basket;
