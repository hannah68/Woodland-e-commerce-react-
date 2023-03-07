import React from "react";

import "../styles/Contact.css";

const Contact = () => {
	return (
		<div className="contact-section">
			<h1>Contact us</h1>
			<hr />
			<h2 className="first-title">How can we help you today?</h2>
			<p>We’re here for you by phone, Livechat and email.</p>
			<h2>Place an order</h2>
			<p>
				Need help placing an order? Call 0800 808 8899 seven days a week from
				10am to 8pm.
			</p>
			<h2>Ask a question about a product you’ve received</h2>
			<p>If you have a product aftercare question, please call 0800 808 8899 from
			10am to 8pm Monday to Friday, Saturday 9am to 6pm and Sunday 10am to 6pm.</p>
			<h2>Follow up on a delivery</h2>
			<p>
				At the moment, we’re experiencing delays to some orders. If you’ve
				placed an order and not yet heard from us, or if you didn’t receive your
				order as scheduled, we sincerely apologise.
			</p>
		</div>
	);
};

export default Contact;
