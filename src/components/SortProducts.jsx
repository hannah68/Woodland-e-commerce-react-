import { useContext } from "react";

import { StoreContext, StoreActions } from "../store";

import "../styles/Shop.css";

const SortProducts = () => {
	const store = useContext(StoreContext);

	// sort By Highest price Handler=============================================
	const sortByHighestHandler = () => {
		const newArr = [...store.state.randomProducts];
		store.dispatch({ type: StoreActions.SORTRANDOMBY_HIGHEST, payload: newArr });
	};

	// sort By Lowest price Handler==============================================
	const sortByLowestHandler = () => {
		const newArr = [...store.state.randomProducts];
		store.dispatch({ type: StoreActions.SORTRANDOMBY_LOWEST, payload: newArr });
	};

	return (
		<ul className="sort-container">
			<li className="lowest" onClick={sortByLowestHandler}>
				Lowest Price
			</li>
			<li className="highest" onClick={sortByHighestHandler}>
				Highest Price
			</li>
		</ul>
	);
};

export default SortProducts;
