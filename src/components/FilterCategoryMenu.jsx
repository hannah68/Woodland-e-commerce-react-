import "../styles/Shop.css";

import { categoryNames } from "../utils";

const FilterCategoryMenu = (props) => {
	const { handleFilterChange, filterData } = props;

	// check Checkbox Handler ===============================
	const checkCheckboxHandler = (categoryName) => {
		return filterData.category.includes(categoryName) ? true : false;
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
