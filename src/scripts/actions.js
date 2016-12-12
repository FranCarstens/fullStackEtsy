import Backbone from 'backbone'
import _ from 'underscore'
import Store from './store'
import User from './models/userModel'
import {FavModel, FavCollection, Catalog, Listing} from './models/productModel'

const Actions = {

	// Let's grab an array of images and return them as a set of html image tags with formatting.
	grabImages(imgArr) {
		var	imgGal = ''
		for (var i = 0; i < imgArr.length; i++ ) {
			imgGal += '<img src="' + imgArr[i].url_570xN + '">'
		}
		return imgGal
	},
	listingImages(imagesArray) {
		var imgGal = this.grabImages(imagesArray)
		return imgGal
	},
	// let's get rid of the ugly formating Etsy text is somehow being output as.
	formatDesc(desc) {
		return desc.replace(/[\n\r]/g, '<br>')
	},

	// === USER MANAGEMENT === //

	registerUser(userObj) {
		User.register(userObj)
			.then(
				function(resp){
					
				},
				function(err){
					alert('Registration Failed: ' + err)
				})

	},
	loginUser(email, password) {
		User.login(email, password)
			.then(
				function(resp){
					location.hash = 'faves'
				},
				function(err){
					alert('Login Failed: ' + err)
				})

	},
	logoutUser() {
		User.logout()
			.then(
				function(resp) {
					location.hash = 'home'
					console.log('user logged out')
				},
				function(err) {
					alert('Something went wrong: ' + err)
				})
	},

	// === DATA MANAGEMENT === //

	addFav(model) {
		var favorite = new FavModel(model)
		console.log('saving fave')
		favorite.set({
			user_id: User.getCurrentUser()._id
		})
		favorite.save()
			.done((resp) => console.log('fav saved', resp))
			.fail((resp) => console.log('fav save failed', resp))
		location.hash = 'faves'
	},
	delFav(mid) {
		console.log(Store._data)
		console.log(mid)
		var coll = Store._getProp('favColl')
		var mod = coll.get(mid)
		mod.destroy()
			.done((resp) => console.log('delete successful', resp))
			.fail((resp) => console.log('delete failed', resp))
		location.hash = 'faves'	
	},
	fetchCatalog() {
		var coll = new Catalog()
		coll.fetch({
			'dataType': 'jsonp',
			data: {
				'api_key': Store._getProp('apiKey'),
				'includes': 'MainImage,Shop'
			}
		}).then(function(){
			Store._setData({
				catColl : coll
			})
		})
		var locoll = new FavCollection()
		let uid = User.getCurrentUser() ? User.getCurrentUser()._id : 0
		locoll.fetch({
			data: {
				user_id: uid
			}
		})
			.then(function(){
				Store._setData({
					favColl: locoll
				})
			})
	},
	fetchListing(listingId) {
		var mod = new Listing({
			id: listingId + '.js'
		})
		mod.fetch({
			'dataType': 'jsonp',
			'data': {
				'api_key': Store._getProp('apiKey'),
				'includes': 'Shop,Images,MainImage'
			}
		}).then( function() {
			Store._setData({
				catMod : mod
			})
		})
		var fav = new FavModel({
			_id: listingId
		})
		fav.fetch()
			.then(function(){
				Store._setData({
					favMod: fav
				})
			},
			function(err) {
				console.log('fav fetch error',err)
			}
		)
	},
	getHash(hash) {
		return hash.split('/')[0].substring(1)
	},
	getListingId(hash) {
		return hash.split('/')[1].trim()
	},
	setListing() {
		var listingId = this.getListingId(location.hash)
		var listingType = this.getHash(location.hash) === 'faves' ? 'faves' : ''
		Store._setData({
			listingId: listingId,
			listingType: listingType,
		})
	}

}

export default Actions