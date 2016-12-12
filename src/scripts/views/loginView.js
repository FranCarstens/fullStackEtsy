import React from 'react'

import Actions from '../actions'
import Store from '../store'

import Header from '../components/header'
import Footer from '../components/footer'
import {Register, Login} from '../components/user_forms'
import User from '../models/userModel'

window.User = User
console.log()

var LoginView = React.createClass({
	componentWillMount() {
		Actions.fetchCatalog()
		Store.on('updateState', () => {
			this.setState(
				Store._getData()
			)
		})
	},
	componentWillUnmount() {
		Store.off('updateState')
	},
	getInitialState() {
		return Store._getData()
	},
	render() {
		let a = window.User.getCurrentUser() != null
		// if ( a === true) {			
		// 	location.hash = 'home'
		// 	return (
		// 		null
		// 		)
		// }
		// else {
			return (
				<div>
					<Header />
					<Register />
					<Login />
					<Footer />
				</div>
			)
		// }
	}
})


export default LoginView