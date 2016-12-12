import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import GalleryView from './views/galleryView'
import ListView from './views/listingView'
import LoginView from './views/loginView'
import {Catalog, Listing} from './models/productModel'
import Store from './store'
import User from './models/userModel'

import init from './init'

const app = function() {
// Betsy KEYSTRINGs8o0rxbvacpsvll9ieu9705f SHARED SECRETah6tue76zb

window.User = User
var Controller = Backbone.Router.extend({
	'routes': {
		'home': 'handleHome',
		'details/:listing_id': 'handleListing',
		'faves': 'handleFaves',
		'faves/:listing_id': 'handleFavListing',
		'login': 'handleLogin',
		// 'search/:query': 'handleSearch',
		'*default': 'handleDefault'
	},
	'handleHome': function(){
		// console.log('###handleHome: checking in once.')
		ReactDOM.render(<GalleryView />, document.querySelector('.body-wrapper'))
	},
	'handleListing': function(listing_id){
		// console.log('###handleDetails: checking in once')
		ReactDOM.render(<ListView listing={listing_id} />, document.querySelector('.body-wrapper'))
	},
	'handleFaves': function(){
		// console.log('###handleHome: checking in once.')
		ReactDOM.render(<GalleryView />, document.querySelector('.body-wrapper'))
	},
	'handleFavListing': function(listing_id){
		// console.log('###handleDetails: checking in once')
		ReactDOM.render(<ListView listing={listing_id} />, document.querySelector('.body-wrapper'))
	},
	'handleLogin': function() {
		// console.log('###handleLogin: checking in once.')
		ReactDOM.render(<LoginView />, document.querySelector('.body-wrapper'))
	},

	// 'handleSearch': function(query) {
	// 	var searchPage = new Catalog(),
	// 	promise = searchPage.fetch({
	// 		'dataType': 'jsonp',
	// 		'data': {
	// 			'api_key': Store._getProp('apiKey'),
	// 			'includes': 'MainImage,Shop',
	// 			'keywords': query
	// 		}
	// 	})
	// 	promise.then(function() {
	// 		ReactDOM.render(<GalleryView collection={searchPage} />, document.querySelector('.body-wrapper'))
	// 	})

	// },

	'handleDefault': function() {
		// console.log('###handleDefault: checking in once')
		location.hash = 'home'
	},
	'initialize': function() {
		Backbone.history.start()
	}
})

var controller = new Controller()
}


// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..