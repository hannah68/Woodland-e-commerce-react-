import { useState, useEffect } from "react";

import FilterProducts from "../components/FilterProducts";
import Product from "../components/Product";
import SearchShop from "../components/SearchShop";

import "../styles/Shop.css";

import { APIEndPoints } from "../config";

import { randomFnForProducts } from "../utils";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [randomProducts, setRandomProducts] = useState([]);
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
		setRandomProducts(filteredArr);
	};

	// handle Filter Price ==================================================
	const handleFilterPrice = (e) => {
		setPriceValue(e.target.value);
	};

	// submit Search Handler ================================================
	const submitSearchHandler = (e) => {
		e.preventDefault();
		const filteredData = products.filter((el) => {
			return el.category === searchValue || el.title === searchValue
		});
		setRandomProducts(filteredData);
		setSearchValue("");
	};

	// search Filter Handler===================================================
	const searchFilterHandler = (e) => {
		const value = e.target.value;
		const capitalize = value.charAt(0).toUpperCase();
		const inputValue = capitalize + value.slice(1);
		setSearchValue(inputValue);
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
		const newArr = [...randomProducts];
		const sortedArr = newArr.sort((a, b) => b.price - a.price);
		setRandomProducts(sortedArr);
	};

	// sort By Lowest price Handler==============================================
	const sortByLowestHandler = () => {
		const newArr = [...randomProducts];
		const sortedArr = newArr.sort((a, b) => a.price - b.price);
		setRandomProducts(sortedArr);
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
			const cleanData = data.filter((item) => {
				return productArrId.includes(item.id);
			});
			setRandomProducts(cleanData);
		};
		fetchProducts();
	}, []);

	return (
		<div className="shop-section">
			<SearchShop
				searchValue={searchValue}
				searchFilterHandler={searchFilterHandler}
				submitSearchHandler={submitSearchHandler}
				randomFnForProducts={setRandomProducts}
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
					{randomProducts.map((item, index) => {
						return <Product key={index} item={item} />;
					})}
				</div>
			</section>
		</div>
	);
};

export default Shop;
