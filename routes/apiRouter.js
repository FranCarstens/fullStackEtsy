let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Fav = require('../db/schema.js').Fav

apiRouter
	.get('/users', function(req, res){
		User.find(req.query , "-password", function(err, results){
			if(err) return res.json(err) 
				res.json(results)
		})
	})

apiRouter
	.get('/users/:_id', function(req, res){
		User.findById(req.params._id, "-password", function(err, record){
			if(err || !record ) return res.json(err) 
				res.json(record)
		})
	})
	.put('/users/:_id', function(req, res){

		User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
			if (err) {
				res.status(500).send(err)
			}
			else if (!record) {
				res.status(400).send('no record found with that id')
			}
			else {
				res.json(Object.assign({},req.body,record))
			}
		})
	})

	.delete('/users/:_id', function(req, res){
		User.remove({ _id: req.params._id}, (err) => {
			if(err) return res.json(err)
				res.json({
					msg: `record ${req.params._id} successfully deleted`,
					_id: req.params._id
			})
		})  
	})

    // Routes for a Model(resource) should have this structure

apiRouter

    .post('/likes', function(req, res) {
    	var recordObj = new Fav(req.body)
    	recordObj.save(function(err) {
    		if (err) {
    			res.status(400).send(err)
    		}
    		else {
    			res.json(recordObj)
    		}
    	})
    })
    .get('/likes', function(req, res) {
    	Fav.find(req.query, function(err, records){
    		if(err) {
    			res.status(400).send(err)
    		}
    		else {
    			res.json(records)
    		}
    	})
    })
    .get('/likes/:_id', function(req,res) {
    	Fav.findById(req.params._id, function(err, record){
    		if(err) {
    			res. status(400).send(err)
    		}
    		else {
    			res.json(record)	
    		}
    	})
    })
    .delete ('/likes/:_id', function(req,res) {
    	delete req.body._id
    	Fav.findByIdAndRemove(req.params._id, req.body, function(err, record) {
    		if (err) {
    			res.status(500).send(err)
    		}
    		else if (!record) {
    			res.status(400).send('no record to delete')
    		}
    		else {
    			res.json(req.body)
    		}
    	})
    })

module.exports = apiRouter