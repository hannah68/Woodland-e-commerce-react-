import "../styles/Shop.css";

import { colorNames } from "../utils";

const FilterColorMenu = (props) => {
	const { filterData, handleFilterChange } = props;

	// check Checkbox Handler ===============================
	const checkCheckboxHandler = (colorName) => {
		return filterData.color.includes(colorName) ? true : false;
	};

	return (
		<div className="color__list">
			{colorNames.map((colorName, index) => {
				return (
					<div key={index}>
						<input
							type="checkbox"
							id={colorName}
							name={colorName}
							onChange={(e) => handleFilterChange(e, "color")}
							checked={checkCheckboxHandler(colorName)}
						/>
						<label htmlFor={colorName}>{colorName}</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterColorMenu;
