import { useContext } from "react";

import "../styles/Shop.css";

import { collectionNames } from "../utils";
import { StoreContext } from "../store";

const FilterCollectionMenu = (props) => {
	const store = useContext(StoreContext);
	const { handleFilterChange } = props;

	// check Checkbox Handler ================================
	const checkCheckboxHandler = (collectionName) => {
		return store.state.filterData.collection.includes(collectionName) ? true : false;
	};

	return (
		<div className="collection__list">
			{collectionNames.map((collectionName, index) => {
				return (
					<div key={index}>
						<input
							type="checkbox"
							id={collectionName}
							name={collectionName}
							onChange={(e) => handleFilterChange(e, "collection")}
							checked={checkCheckboxHandler(collectionName)}
						/>
						<label htmlFor={collectionName}>{collectionName}</label>
					</div>
				);
			})}
		</div>
	);
};

export default FilterCollectionMenu;
