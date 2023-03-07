import { useState, useEffect, useContext } from "react";

import FilterProducts from "../components/FilterProducts";
import Product from "../components/Product";
import SearchShop from "../components/SearchShop";

import "../styles/Shop.css";

import { APIEndPoints } from "../utils/config";
import { randomFnForProducts } from "../utils/utils";
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
			const res = await fetch(APIEndPoints.shop);
			const data = await res.json();
			// uncleaned data/ all products
			setProducts(data);
			// cleaned data / only show 6 product on screen(based on random number)
			const productArrId = randomFnForProducts(42);
			store.dispatch({ type: StoreActions.SHOW_RANDOMPRODUCTS, payload: { data, productArrId }})
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
					{store.state.randomProducts.map((item, index) => {
						return <Product key={ index } item={ item } />;
					})}
				</div>
			</section>
		</div>
	);
};

export default Shop;
