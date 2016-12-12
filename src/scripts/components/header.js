import React from 'react'
import Actions from '../actions'

var Header = React.createClass({
	'_search': function(event){
		event.preventDefault()
		var formEl = event.target
		location.hash = "search/" + formEl.search.value
	},
	_logout() {
		Actions.logoutUser()
	},
	'render': function() {

		return(

			<header className="clearfix">
				<a href="#home"><h1>Betsy<br /><span>for Etsy</span></h1></a>
				<ul>
					<li><a href="#faves">Faves</a></li>
					<li><a href="#login">Login</a></li>
					<li><a href="#" onClick={this._logout}>Logout</a></li>
				</ul>
				<form onSubmit={this._search} id="search-container">
					<input name="search" id="search" placeholder="Find that perfect gift..." />
					<button id="search_submit" className="icon-search" type="submit">Search</button>
				</form>
			</header>

		)
	}
})

export default Header