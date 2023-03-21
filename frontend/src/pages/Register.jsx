import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import { PAGE_LINK } from "../utils/config.js";

import "../styles/Register.css";

const Register = () => {
	const [submit, setSubmit] = useState(false);
	const [userInfo, setUserInfo] = useState({
		username: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	useEffect(() => {
	  if(submit){
		const postUserInfoToDB = async() => {
			const useRes = await fetch("http://localhost:5000/user/register", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(userInfo)
			});
			const userData = await useRes.json();

			localStorage.setItem("token", userData.token);
			if(userData.data){
				localStorage.setItem("userId", userData.data.id.toString());
				navigate(PAGE_LINK.home, { replace: true });
			}
		}
		postUserInfoToDB()
	  }
	  setSubmit(false);
	}, [submit, userInfo, navigate])
	

	const submitRegisterFormHandler = (e) => {
		e.preventDefault();
		setSubmit(true);
	};

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	return (
		<div className="register-section">
			<div className="register-images">
				<img src="./assets/images/register-img.png" alt="register-img" />
			</div>
			<div className="register-page">
				<h1>
					Create an account and take advantage of faster checkouts and other
					great benefits.
				</h1>
				<form className="register-form" onSubmit={submitRegisterFormHandler}>
					<div className="input-groups">
						<label htmlFor="username">
							<FaUser />
						</label>
						<input
							type="text"
							placeholder="Username"
							id="username"
							name="username"
							data-lpignore="true"
							value={userInfo.username}
							onChange={changeHandler}
						/>
					</div>
					<div className="input-groups">
						<label htmlFor="email">
							<MdEmail />
						</label>
						<input
							type="text"
							placeholder="Email"
							id="email"
							name="email"
							data-lpignore="true"
							value={userInfo.email}
							onChange={changeHandler}
						/>
					</div>
					<div className="input-groups">
						<label htmlFor="password">
							<RiLockPasswordFill />
						</label>
						<input
							type="password"
							placeholder="Password"
							name="password"
							id="password"
							data-lpignore="true"
							value={userInfo.password}
							onChange={changeHandler}
						/>
					</div>
					<div className="checkbox-group">
						<input type="checkbox" name="terms" required data-lpignore="true" />
						<span className="terms">
							I agree to the terms and privacy policy.
						</span>
					</div>
					<button type="submit" className="register-button">
						Register
					</button>

					<div className="login-container">
						<p className="signin-text">Already have an account?</p>
						<Link to={PAGE_LINK.login} className="signin-btn">
							Signin
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
