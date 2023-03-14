import { useState, useEffect, useContext } from "react";

import FilterProducts from "../components/FilterProducts";
import Product from "../components/Product";
import SearchShop from "../components/SearchShop";

import "../styles/Shop.css";

import { APIEndPoints } from "../utils/config";
import { StoreActions, StoreContext } from "../store";

const Shop = () => {
	const store = useContext(StoreContext);
	const [products, setProducts] = useState([]);

	// submit Filter Form Handler ============================================
	const submitFilterFormHandler = (e) => {
		e.preventDefault();
		const data = store.state.filterData;

		const filteredArr = products.filter((el) => {
			return (
				data.collection.includes(el.collection) &&
				data.color.includes(el.color) &&
				data.category.includes(el.category) &&
				el.price <= store.state.priceValue
			);
		});

		store.dispatch({type: StoreActions.UPDATE_RANDOMPRODUCTS, payload: filteredArr});
	};

	// submit Search Handler ================================================
	const submitSearchHandler = (e) => {
		e.preventDefault();
		const filteredData = products.filter((el) => {
			return el.category === store.state.searchValue || el.title === store.state.searchValue
		});

		store.dispatch({ type: StoreActions.UPDATE_RANDOMPRODUCTS, payload: filteredData });
		store.dispatch({ type: StoreActions.UPDATE_SEARCHVALUE, payload:"" });
	};

	// use effect for fetching products and displaying on screen==================
	useEffect(() => {
		const fetchProducts = async () => {
			try{
				const res = await fetch("http://localhost:5000/products/");
				const products = await res.json();
				setProducts(products.data);
			}catch(error){
				console.error("error", error);
			}
			
		};
		fetchProducts();
		
	}, []);

	return (
		<div className="shop-section">
			<SearchShop submitSearchHandler={ submitSearchHandler }/>

			<section className="container">
				<div className="filter-container">
					<FilterProducts submitFilterFormHandler={ submitFilterFormHandler }/>
				</div>

				<div className="product-container">
					{ products && products.map((item, index) => {
						return <Product key={ index } item={ item } />;
					})}
				</div>
			</section>
		</div>
	);
};

export default Shop;
