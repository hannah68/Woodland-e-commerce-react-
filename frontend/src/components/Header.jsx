import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext } from "react";

import { PAGE_LINK } from "../utils/config";
import { capitaliseFirstLetter } from "../utils/utils.js";
import { StoreContext } from "../store";
import { StoreActions } from "../store";

import "../styles/Header.css";

const Header = () => {
	const store = useContext(StoreContext);


	// format username================================
	const formatUserName = (user) => {
		let username = user.toLowerCase();
		return capitaliseFirstLetter(username);
	};

	// handle click===================================
	const handleClick = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		store.dispatch({ type: StoreActions.UPDATE_ISLOGGEDIN, payload: false});
		store.dispatch({ type: StoreActions.UPDATE_USER, payload: null});
	};

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

					{!store.state.isLoggedIn && (
						<div className="navbar__icon">
							<Link to={ PAGE_LINK.login }>
								<span className="login-icon">
									<BsFillPersonFill />
								</span>
							</Link>
						</div>
					)}
					{/* If user exist and user is logged in */}
					{ store.state.isLoggedIn && store.state.user && (
						<div className="navbar__icon">
							<span className="navbar-name">
								Hi { formatUserName(store.state.user) }
							</span>

							<span onClick={ handleClick }>
								<Link to={ PAGE_LINK.home }>Sign Out</Link>
							</span>

							<Link to={ PAGE_LINK.basket }>
								{store.state.basketItems.length > 0 && (
								<div className="basket-num">
									{ store.state.basketItems.length }
								</div>)}
								<span className="basket">
									<FaShoppingCart />
								</span>
							</Link>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
