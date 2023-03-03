import { useContext } from "react";

import "../styles/Shop.css";

import { categoryNames } from "../utils";
import { StoreContext } from "../store";

const FilterCategoryMenu = (props) => {
	const store = useContext(StoreContext);
	const { handleFilterChange } = props;

	// check Checkbox Handler ===============================
	const checkCheckboxHandler = (categoryName) => {
		return store.state.filterData.category.includes(categoryName) ? true : false;
	};

	return (
		<div className="category__list">
			{categoryNames.map((categoryName, index) => {
				return (
					<div key={index}>
						<input
							type="checkbox"
							id={categoryName}
							name={categoryName}
							onChange={(e) => handleFilterChange(e, "category")}
							checked={checkCheckboxHandler(categoryName)}
						/>
						<label htmlFor={categoryName}>{categoryName}</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterCategoryMenu;
