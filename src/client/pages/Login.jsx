import { Link } from "react-router-dom";

import { PAGE_LINK } from "../utils/config";

import "../styles/Login.css";

const Login = ({ login, setLogin }) => {
    

    // submit login form handler =========================
	const submitLoginFormHandler = (e) => {
		e.preventDefault();
        console.log(login);
	};

    // change login form =================================
	const changeHandler = (e) => {
		const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
	};

	return (
		<div className="login-section">
			<p>
				Please sign in to <strong>your WoodLand</strong> account.
			</p>
			<form className="login-form" onSubmit={ submitLoginFormHandler }>
				<div className="email-group">
					<label htmlFor="email">Enter your email address</label>
					<input
						type="email"
						id="email"
						name="email"
                        value={ login.email }
						onChange={ changeHandler }
					/>
				</div>
				<div className="password-group">
					<label htmlFor="password">Enter your password</label>
					<input
						type="password"
						id="password"
						name="password"
                        value={ login.password }
						onChange={ changeHandler }
					/>
				</div>
				<button type="submit" className="login-btn">
					SIGN IN
				</button>
				<span style={{ display: "block" }}>Or</span>
				<Link to={PAGE_LINK.register} className="register-btn">
					CREATE AN ACCOUNT
				</Link>
			</form>
		</div>
	);
};

export default Login;
