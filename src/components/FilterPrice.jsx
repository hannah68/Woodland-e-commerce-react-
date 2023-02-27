import "../styles/Shop.css";

const FilterPrice = (props) => {
	const { handleFilterPrice, priceValue } = props;

	return (
		<div className="price__list">
			<div className="range-container">
				<input
					type="range"
					id="min-price"
					name="min-price"
					min={0}
					max="8"
					step="10"
				/>
				<input
					type="range"
					id="max-price"
					name="max-price"
					value={priceValue}
					min="0"
					max={1000}
					step="10"
					onChange={handleFilterPrice}
				/>
			</div>
			<div className="price-text">
				<div className="min-text">
					<span>£</span>
					<input
						type="number"
						defaultValue="0"
						min={0}
						max={1000}
						id="min-num"
					/>
				</div>
				<div className="max-text">
					<span>£</span>
					<input
						type="number"
						value={priceValue}
						min={0}
						max={1000}
						id="max-num"
						onChange={handleFilterPrice}
					/>
				</div>
			</div>
		</div>
	);
};

export default FilterPrice;
