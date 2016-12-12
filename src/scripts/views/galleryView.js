import React from 'react'

import Actions from '../actions'
import Store from '../store'

import Header from '../components/header'
import Footer from '../components/footer'

import User from '../models/userModel'

var GalleryView = React.createClass({
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
		console.log("galleryview on")
		var coll = location.hash === '#faves' ? this.state.favColl : this.state.catColl
		return (
			<div>
				<Header />
				<GalleryContainer collection={coll} />
				<Footer />
			</div>
		)
	}
})
var GalleryContainer = React.createClass({
	'_grabListing': function() {
		var listingArray = []
		for ( var i = 0; i < this.props.collection.length; i++ ) {
			var listingModel = this.props.collection.models[i]
			listingArray.push(<GalleryListing model={listingModel} model-type={this.props.collection.mod_type} />)
		}
		return listingArray
	},
	'render': function(){
		return(
			<section id="content" className="gallery_view">
				{ this._grabListing() }
			</section>
		)
	}
})

var GalleryListing = React.createClass({
	render() {
		let model = this.props.model
		let route = location.hash === '#home' ? '#details' : '#faves'
		let mid = location.hash === '#home' ? model.get('listing_id') : model.get('_id')
		var background = {
			backgroundImage: `url(${model.get('MainImage').url_570xN})`
		}
		return (

				<div className="product">
					<a className="view_listing" href={ route + '/' + mid }>
					<div className="product_image" style={background} ></div>
						<div className="details">
							<h3>by { model.get('Shop').shop_name } <span className="price"> { model.get('price')} </span></h3>
							<p> { model.get('title') } </p>
						</div>	
					</a>
				</div>

		)
	}
})

export default GalleryView