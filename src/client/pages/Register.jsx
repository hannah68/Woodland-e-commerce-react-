import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import "../styles/Register.css";

const Register = ({ register, setRegister }) => {
	const submitRegisterFormHandler = (e) => {
		e.preventDefault();
	};

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setRegister({ ...register, [name]: value });
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
							value={register.username}
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
							value={register.email}
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
							value={register.password}
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
				</form>
			</div>
		</div>
	);
};

export default Register;
