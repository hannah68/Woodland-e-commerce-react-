import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext } from "react";

import { PAGE_LINK } from "../utils/config";
import { StoreContext } from "../store";

import "../styles/Header.css";

const Header = () => {
	const store = useContext(StoreContext);

	const className =
		store.state.shoppingCart.length === 0 ? "basket-num hide" : "basket-num";

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
							<Link to={PAGE_LINK.shop}>Shop</Link>
						</li>
						<li className="navbar__lists--item">
							<Link to={PAGE_LINK.contact}>Contact Us</Link>
						</li>
					</ul>

					<div className="navbar__icon">
						<Link to={PAGE_LINK.login}>
							<span className="login-icon">
								<BsFillPersonFill/>
							</span>
						</Link>
						<Link to={PAGE_LINK.basket}>
							<div className={className}>{store.state.shoppingCart.length}</div>
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
