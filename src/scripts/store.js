import Backbone from 'backbone'
import _ from 'underscore'
import {FavModel, FavCollection, Catalog, Listing} from './models/productModel'


const Store = _.extend(Backbone.Events,{

	_data: {
		'catColl': new Catalog(),
		'catMod': new Listing(),
		'favColl': new FavCollection(),
		'favMod': new FavModel(),
		'apiKey': 's8o0rxbvacpsvll9ieu9705f',
		'shopID': '',
		'listingId': '',
		'listingType': '',
		'searchQuery': '',
		'modelId': '',
	},
	_getProp(key) {
		return this._data[key]
	},
	_getData() {
		return this._data
	},
	_emitChange() {
		console.log('Changed')
		this.trigger('updateState')
	},
	_setData(dataObj) {
		this._data = _.extend(this._data, dataObj)
		this._emitChange()
	},
	_initialize() {
		this._getProp('favColl').on('update sync', () => { this._emitChange() } )
	}
})

Store._initialize()
export default Store