import "../styles/Shop.css";

import { collectionNames } from "../utils";

const FilterCollectionMenu = (props) => {
	const { filterData, handleFilterChange } = props;

	// check Checkbox Handler ================================
	const checkCheckboxHandler = (collectionName) => {
		return filterData.collection.includes(collectionName) ? true : false;
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
