import { useState, useContext } from "react";
import { FaAngleDown } from "react-icons/fa";

import "../styles/Shop.css";

import SortProducts from "./SortProducts";
import { StoreContext } from "../store";

const SearchShop = (props) => {
	const store = useContext(StoreContext); 
	const {
		searchFilterHandler,
		submitSearchHandler,
		sortByHighestHandler,
		sortByLowestHandler,
	} = props;


	const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

	return (
		<section className="search-container">
			<div className="search">
				<form className="search__form" onSubmit={submitSearchHandler}>
					<input
						className="search__input"
						type="text"
						placeholder="Search by a Category / Title..."
						value={store.state.searchValue}
						onChange={searchFilterHandler}
					/>
				</form>

				<div className="search__sort">
					<button className="search__sort--btn">
						<div className="sort-btn-container">
							<span>Sort By</span>
							<span
								className="dropdown-icon"
								onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
							>
								<FaAngleDown />
							</span>
						</div>
						{isSortMenuOpen && (
							<SortProducts
								sortByLowestHandler={sortByLowestHandler}
								sortByHighestHandler={sortByHighestHandler}
							/>
						)}
					</button>
				</div>
			</div>
		</section>
	);
};

export default SearchShop;
