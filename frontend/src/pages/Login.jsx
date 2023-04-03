import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import "../styles/Login.css";

import { PAGE_LINK } from "../utils/config";
import { StoreContext } from "../store";
import { StoreActions } from "../store";

const Login = () => {
	const store = useContext(StoreContext);
	const [submit, setSubmit] = useState(false);
	const [userLogin, setUserLogin] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	useEffect(() => {
		const postUserLoginToDB = async () => {
			try {
				const userRes = await fetch("http://localhost:5000/user/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(userLogin),
				});
				const userData = await userRes.json();
			
				if (userRes.ok) {
					localStorage.setItem("token", userData.token);
					
					if (userData.data) {
						localStorage.setItem("userId", userData.data.id.toString());
						store.dispatch({ type: StoreActions.UPDATE_USER, payload: userData.data.username });
					}
				} 
			} catch (err) {
				console.log("An error occurred while logging in user: ", err);

			}
		};
		if(submit){ 
			postUserLoginToDB();
			store.dispatch({ type: StoreActions.UPDATE_ISLOGGEDIN, payload: true});
			navigate(PAGE_LINK.home, { replace: true });
		}
		
	  return () => {
		// Cancel any outstanding asynchronous tasks or subscriptions here
	  }
	}, [navigate, userLogin, submit])
	

	// submit login form handler =========================
	const submitLoginFormHandler = (e) => {
		e.preventDefault();
		setSubmit(true);
	};

	// change login form =================================
	const changeHandler = (e) => {
		const { name, value } = e.target;
		setUserLogin({ ...userLogin, [name]: value });
	};

	return (
		<div className="login-section">
			<p>
				Please sign in to <strong>your WoodLand</strong> account.
			</p>
			<form className="login-form" onSubmit={submitLoginFormHandler}>
				<div className="email-group">
					<label htmlFor="email">Enter your email address</label>
					<input
						type="email"
						id="email"
						name="email"
						value={userLogin.email}
						onChange={changeHandler}
					/>
				</div>
				<div className="password-group">
					<label htmlFor="password">Enter your password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={userLogin.password}
						onChange={changeHandler}
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
