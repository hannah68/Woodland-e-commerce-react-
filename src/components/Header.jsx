import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import { PAGE_LINK } from "../config";

import "../styles/Header.css";

const Header = (props) => {
	const { shoppingCart } = props;
	const className =
		shoppingCart.length === 0 ? "basket-num hide" : "basket-num";

	return (
		<header>
			<nav className="navbar-container">
				<div className="navbar">
					<div className="navbar__logo">
						<Link to={PAGE_LINK.home}>
							<img src="../assets/images/logo.svg" alt="logo" />
						</Link>
					</div>

					<ul className="navbar__lists">
						<li className="navbar__lists--item">
							<Link to={PAGE_LINK.home}>Home</Link>
						</li>
						<li className="navbar__lists--item">
							<Link to={PAGE_LINK.about}>About</Link>
						</li>
						<li className="navbar__lists--item">
							<Link to={PAGE_LINK.shop}>Shop</Link>
						</li>
						<li className="navbar__lists--item">
							<Link to={PAGE_LINK.contact}>Contact</Link>
						</li>
					</ul>

					<div className="navbar__icon">
						<Link to={PAGE_LINK.basket}>
							<div className={className}>{shoppingCart.length}</div>
							<span>
								<FaShoppingCart />
							</span>
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
