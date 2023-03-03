import { useContext } from "react";

import { StoreContext } from "../store";

import { colorNames } from "../utils";
import "../styles/Shop.css";

const FilterColorMenu = (props) => {
	const store = useContext(StoreContext);
	const {  handleFilterChange } = props;

	// check Checkbox Handler ===============================
	const checkCheckboxHandler = (colorName) => {
		return store.state.filterData.color.includes(colorName) ? true : false;
	};

	return (
		<div className="color__list">
			{colorNames.map((colorName, index) => {
				return (
					<div key={ index }>
						<input
							type="checkbox"
							id={ colorName }
							name={ colorName }
							onChange={ (e) => handleFilterChange(e, "color") }
							checked={ checkCheckboxHandler(colorName) }
						/>
						<label htmlFor={colorName}>{ colorName }</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterColorMenu;
