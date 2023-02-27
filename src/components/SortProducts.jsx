import "../styles/Shop.css";

const SortProducts = (props) => {
	const { sortByLowestHandler, sortByHighestHandler } = props;

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
