import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { PAGE_LINK } from "../config";

import "../styles/Footer.css";

const Footer = () => {
	return (
		<footer className="footer-container">
			<div className="footer">
				<div className="footer__logo">
					<img src="../assets/images/logo.svg" alt="logo" />
				</div>

				<ul className="footer__lists">
					<li className="footer__lists--item">
						<Link to={PAGE_LINK.home} className="disabled-link">
							Information
						</Link>
					</li>
					<li className="footer__lists--item">
						<Link to={PAGE_LINK.home}className="disabled-link">
							Customer service
						</Link>
					</li>
					<li className="footer__lists--item">
						<Link to={PAGE_LINK.contact}>Contact</Link>
					</li>
				</ul>

				<div className="footer__icon">
					<p>
						<FaFacebook />
					</p>
					<p>
						<FaInstagram />
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
