import React from 'react';

import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-section">
        <p>Please sign in to <strong>your WoodLand</strong> account.</p>
        <form className='login-form'>
            <div className="email-group">
                <label htmlFor="email">Enter your email address</label>
                <input type="email" id='email'/>
            </div>
            <div className="password-group">
                <label htmlFor="password">Enter your password</label>
                <input type="password" id='password'/>
            </div>
            <button type='button' className='login-btn'>SIGN IN</button>
            <span style={{display: "block"}}>Or</span>
            <button type='button' className='register-btn'>CREATE AN ACCOUNT</button>
        </form>
    </div>
  )
}

export default Login