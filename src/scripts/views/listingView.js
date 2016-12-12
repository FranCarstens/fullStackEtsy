import React from 'react'
import _ from 'underscore'

import Actions from '../actions'
import Store from '../store'

import Header from '../components/header'
import Footer from '../components/footer'

var ListingView = React.createClass({
	componentWillMount() {
		console.log('these props', this.props)
		Actions.setListing()
		Actions.fetchCatalog()
		Actions.fetchListing(this.state.listingId)
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
	_getHash(hash) {
		return Actions.getHash(hash)
	},
	render() {
		console.log(this.state)
		console.log('listing view checking in')
		var mod = this._getHash(location.hash) === 'faves' ? this.state.favMod : this.state.catMod
		// console.log('this is mod', mod)
		return (
			<div>
				<Header />
				<ListingDetails model={mod} modelId={this.state.listingId} />
				<Footer />
			</div>
		)
	}
})

var ListingDetails = React.createClass({
	_listingImages(imagesArray) {
		return { __html: Actions.listingImages(imagesArray) }
	},
	_addFav() {
		let id = {_id: this.props.modelId}
		let favModel = _.extend(this.props.model.attributes)
		console.log('my fav',favModel)
		Actions.addFav(favModel)
	},
	_delFav() {
		Actions.delFav(this.props.modelId)
	},
	_formatDesc(desc) {
		return { __html: Actions.formatDesc(desc)}
	},
	render: function() {
		let model = this.props.model
		let favLink = Actions.getHash(location.hash) === 'faves' ? this._delFav : this._addFav
		let favIco = Actions.getHash(location.hash) === 'faves' ? 'icon-heart' : 'icon-heart-outlined'
		let listingImages = model.get('Images') ? model.get('Images') : []
		let shop = model.get('Shop') ? model.get('Shop') : {}
		let descript = model.get('description') ? this._formatDesc(model.get('description')) : {__html: ''}
		console.log(model)
		return (
			<section id="content" className="listing-view">
				<div className="images-container" dangerouslySetInnerHTML={ this._listingImages(listingImages) } ></div>
				<div className="details-container">
					<h3>
						<span onClick={favLink}><i className={'favorite ' + favIco}></i>favorite </span> { model.get('title') }
					</h3>
					<a href={ shop.url }><sub> by { shop.shop_name } </sub> </a>
					<p><a href={ model.get('url') }>View Listing On Etsy <i className="icon-link"></i></a></p>
					<p className="price"> { model.get('price') } </p>
					<div dangerouslySetInnerHTML={descript}></div>
				</div>
			</section>
		)
	}
})

export default ListingView