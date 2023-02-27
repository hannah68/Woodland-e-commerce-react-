import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import "../styles/Shop.css";

import SortProducts from "./SortProducts";

const SearchShop = (props) => {
	const {
		searchValue,
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
						value={searchValue}
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
