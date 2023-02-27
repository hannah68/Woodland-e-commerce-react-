import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import "../styles/Shop.css";

import FilterCollectionMenu from "./FilterCollectionMenu";
import FilterColorMenu from "./FilterColorMenu";
import FilterCategoryMenu from "./FilterCategoryMenu";
import FilterPrice from "./FilterPrice";

const FilterProducts = (props) => {
	const {
		filterData,
		handleFilterChange,
		handleFilterPrice,
		priceValue,
		submitFilterFormHandler,
		clearAllFilterHandler,
	} = props;

	const [collectionMenuOpen, setCollectionMenuOpen] = useState(false);
	const [colorMenuOpen, setColorMenuOpen] = useState(false);
	const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

	return (
		<>
			<div className="clear-container">
				<h2>Filtered by</h2>
				<button className="clear-btn" onClick={clearAllFilterHandler}>
					Clear All
				</button>
			</div>

			<form className="filter__collection" onSubmit={submitFilterFormHandler}>
				{/* collection section */}
				<div
					className={
						collectionMenuOpen
							? "collection__menu removeBorder"
							: "collection__menu"
					}
				>
					<span>Collection</span>
					<span onClick={() => setCollectionMenuOpen(!collectionMenuOpen)}>
						<FaChevronDown />
					</span>
				</div>
				{collectionMenuOpen && (
					<FilterCollectionMenu
						handleFilterChange={handleFilterChange}
						filterData={filterData}
					/>
				)}

				{/* color section */}
				<div
					className={colorMenuOpen ? "color__menu removeBorder" : "color__menu"}
				>
					<span>Color</span>
					<span onClick={() => setColorMenuOpen(!colorMenuOpen)}>
						<FaChevronDown />
					</span>
				</div>
				{colorMenuOpen && (
					<FilterColorMenu
						handleFilterChange={handleFilterChange}
						filterData={filterData}
					/>
				)}

				{/* category section */}
				<div
					className={
						categoryMenuOpen ? "category__menu removeBorder" : "category__menu"
					}
				>
					<span>Category</span>
					<span onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}>
						<FaChevronDown />
					</span>
				</div>
				{categoryMenuOpen && (
					<FilterCategoryMenu
						handleFilterChange={handleFilterChange}
						filterData={filterData}
					/>
				)}

				{/* price section */}
				<div className="price__menu">
					<span className="price-name">Price Range</span>
				</div>
				<FilterPrice
					handleFilterPrice={handleFilterPrice}
					priceValue={priceValue}
				/>

				<button type="submit" className="search-btn">
					Search
				</button>
			</form>
		</>
	);
};

export default FilterProducts;
