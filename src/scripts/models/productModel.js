import Backbone from 'backbone'

// LOCAL DATA

export const FavModel = Backbone.Model.extend({
	urlRoot: '/api/likes',
	idAttribute: '_id'
})

export const FavCollection = Backbone.Collection.extend({
	url: '/api/likes',
	model: FavModel
})

// REMOTE DATA

export const Catalog = Backbone.Collection.extend({
	'url': 'https://openapi.etsy.com/v2/listings/active.js?',
	'parse': function(rawData){
		var parsedData = rawData.results
		return parsedData
	}
})

export const Listing = Backbone.Model.extend({
	
	'urlRoot': 'https://openapi.etsy.com/v2/listings/',
	'parse': function(rawData) {
		var parsedData = rawData.results[0]
		return parsedData
	}
})

//https://openapi.etsy.com/v2/listings/398368821 example product