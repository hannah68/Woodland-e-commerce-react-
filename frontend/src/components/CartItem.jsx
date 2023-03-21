import { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { FaPlus, FaMinus } from "react-icons/fa";
import { StoreContext, StoreActions } from "../store";
import { starIcons, randomStar } from "../utils/utils";
import { APIEndPoints, PAGE_LINK } from "../utils/config";

import "../styles/Basket.css";

const CartItem = ({ item }) => {
	const [isEdited, setIsEdited] = useState(false);
	const [deletedItem, setDeletedItem] = useState(null);
	const [updatedProduct, setUpdatedProduct] = useState({});
	
	const store = useContext(StoreContext);
	let navigate = useNavigate();


	// use effect for updating basket quantity======================
	useEffect(() => {
		const updateBasketData = async () => {
			await fetch(`${APIEndPoints.basket}/${updatedProduct.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProduct),
			});
		};

		if (isEdited) {
			updateBasketData();
		}

		setIsEdited(false);
	}, [isEdited, updatedProduct]);


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
			store.dispatch({ type: StoreActions.FILTER_SHOPPINGCART, payload: deletedItem});
		}
		setDeletedItem(null);
	}, [deletedItem, navigate]);


	// add more items to cart ================================
	const addItem = (item) => {
		const updatedArr = store.state.shoppingCart.map((el) => {
			if (el.id === item.id) {
				setUpdatedProduct({ ...el, quantity: Number(el.quantity) + 1 });
				return { ...el, quantity: Number(el.quantity) + 1 };
			} else {
				return el;
			}
		});
		
		store.dispatch({type: StoreActions.SHOPPINGCARD, payload: updatedArr});
		setIsEdited(true);
	};


	// remove items from cart==================================
	const removeItem = (item) => {
		const foundItem = store.state.shoppingCart.find((el) => el.id === item.id);

		if (foundItem.quantity > 1) {
			const updatedArr = store.state.shoppingCart.map((el) => {
				if (el.id === item.id) {
					setUpdatedProduct({ ...el, quantity: Number(el.quantity) - 1 });
					return { ...el, quantity: Number(el.quantity) - 1 };
				} else {
					return el;
				}
			});
			store.dispatch({type: StoreActions.SHOPPINGCARD, payload: updatedArr});
			setIsEdited(true);
		} 
		else if (foundItem.quantity <= 1) {
			setDeletedItem(foundItem);
		}
	};


	return (
		<div className="row body-row">
			<div className="body-row-info">
				<img src={item.productId.img} alt={item.productId.title} />
				<div className="info-cart">
					<p>{item.productId.title}</p>
					<div className="cart-stars">
						{starIcons.map((star, index) => {
							return <span key={index}>{star}</span>;
						})}
						<span>{randomStar()}</span>
					</div>
					<p className="delivery">Estimated dispatch within 5 working days</p>
				</div>
			</div>
			<p>£{item.productId.price}</p>
			<div className="quantity-container">
				<button className="popup-plus" onClick={() => removeItem(item)}>
					<FaMinus />
				</button>
				<div className="quantity">{ item.quantity }</div>
				<button className="popup-minus" onClick={() => addItem(item)}>
					<FaPlus />
				</button>
			</div>
			<p>£{(item.quantity * item.productId.price).toFixed(2)}</p>
		</div>
	);
};

export default CartItem;
