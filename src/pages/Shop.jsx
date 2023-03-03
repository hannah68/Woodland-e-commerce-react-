import { useState, useEffect, useContext } from "react";

import FilterProducts from "../components/FilterProducts";
import Product from "../components/Product";
import SearchShop from "../components/SearchShop";

import "../styles/Shop.css";

import { APIEndPoints } from "../config";
import { randomFnForProducts } from "../utils";
import { StoreActions, StoreContext } from "../store";

const Shop = () => {
	const store = useContext(StoreContext);
	const [products, setProducts] = useState([]);
	const [priceValue, setPriceValue] = useState(1000);
	const [filterData, setFilterData] = useState({
		collection: [],
		category: [],
		color: [],
	});

	// handle filter changes================================================
	const handleFilterChange = (e, filterName) => {
		if (filterData[filterName].includes(e.target.name)) {
			let previousfilterNameArr = [...filterData[filterName]];
			const updatedfilterNameArr = previousfilterNameArr.filter(
				(el) => el !== e.target.name
			);
			setFilterData({ ...filterData, [filterName]: updatedfilterNameArr });
		} else {
			setFilterData({
				...filterData,
				[filterName]: [...filterData[filterName], e.target.name],
			});
		}
	};

	// submit Filter Form Handler ============================================
	const submitFilterFormHandler = (e) => {
		e.preventDefault();
		const filteredArr = products.filter((el) => {
			return (
				filterData.collection.includes(el.collection) &&
				filterData.color.includes(el.color) &&
				filterData.category.includes(el.category) &&
				el.price <= priceValue
			);
		});
		store.dispatch({type: StoreActions.UPDATE_RANDOMPRODUCTS, payload: filteredArr});
	};

	// handle Filter Price ==================================================
	const handleFilterPrice = (e) => {
		setPriceValue(e.target.value);
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

	// search Filter Handler===================================================
	const searchFilterHandler = (e) => {
		const value = e.target.value;
		const capitalize = value.charAt(0).toUpperCase();
		const inputValue = capitalize + value.slice(1);
		store.dispatch({ type: StoreActions.UPDATE_SEARCHVALUE, payload: inputValue });
	};

	// clear All Filters Handler================================================
	const clearAllFilterHandler = () => {
		setFilterData({
			collection: [],
			category: [],
			color: [],
		});
		setPriceValue(1000);
		window.location.reload();
	};

	// sort By Highest price Handler=============================================
	const sortByHighestHandler = () => {
		const newArr = [...store.state.randomProducts];
		store.dispatch({ type: StoreActions.SORTRANDOMBY_HIGHEST, payload: newArr });
	};

	// sort By Lowest price Handler==============================================
	const sortByLowestHandler = () => {
		const newArr = [...store.state.randomProducts];
		store.dispatch({ type: StoreActions.SORTRANDOMBY_HIGHEST, payload: newArr });
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
			<SearchShop
				searchFilterHandler={searchFilterHandler}
				submitSearchHandler={submitSearchHandler}
				sortByHighestHandler={sortByHighestHandler}
				sortByLowestHandler={sortByLowestHandler}
			/>

			<section className="container">
				<div className="filter-container">
					<FilterProducts
						setFilterData={setFilterData}
						filterData={filterData}
						products={products}
						handleFilterChange={handleFilterChange}
						handleFilterPrice={handleFilterPrice}
						priceValue={priceValue}
						submitFilterFormHandler={submitFilterFormHandler}
						clearAllFilterHandler={clearAllFilterHandler}
					/>
				</div>

				<div className="product-container">
					{store.state.randomProducts.map((item, index) => {
						return <Product key={index} item={item} />;
					})}
				</div>
			</section>
		</div>
	);
};

export default Shop;