import React from 'react'
import Actions from '../actions'

export const Register = React.createClass({
	_registerUser(e) {
		e.preventDefault()
		var userInput = {
			email: e.target.email.value,
			password: e.target.password.value
		}
		Actions.registerUser(userInput)
	},
	render() {
		return (
			<div>
				<form onSubmit={this._registerUser}>
					<h3>Register</h3>
					<p>Welcome to Betsy for Etsy. Find something you like? Create an account to save your favorites.</p>
					<div className="form_input">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" />
					</div>
					<div className="form_input">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" />
					</div>
					<div className="form_actions">
						<button type="submit">Register</button>
					</div>

				</form>
			</div>
		)
	}
})

export const Login = React.createClass({
	_loginUser(e) {
		e.preventDefault()
		Actions.loginUser(e.target.email.value,e.target.password.value)
	},
	render() {
		return (
			<div>
				<form onSubmit={this._loginUser}>
					<h3>Login</h3>
					<p>Have an account?</p>
					<div className="form_input">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" />
					</div>
					<div className="form_input">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" />
					</div>
					<div className="form_actions">
						<button type="submit">Login</button>
					</div>

				</form>
			</div>
		)
	}
})