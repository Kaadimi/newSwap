const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Products = require('../models/Product')
const auth = require('../middelware/auth')
const helpers = require('../middelware/helpers')

router.post('/changeProfile', auth, (req, res) => {
    console.log(req.body)
    if (!req.body.avatar || !req.body.username || !req.body.email)
        res.send({success: false, msg: 'All fields are required'})
    else {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
            password: "Valid1"
        }
        helpers.CheckData(userData)
        .then(data => User.updateOne({_id: req.id}, {avatar: userData.avatar,
            username: userData.username, email: userData.email}))
        .then(user => {
            console.log(user)
            if (user) {
                Products.updateMany({creator_id: req.id}, {avatar: userData.avatar, username: userData.username})
                .then(finish => {
                    console.log(finish)
                    res.send({success: true, msg: "Profile has been updated successfully"})
                })
                .catch(error => res.send({success: false, msg: error}))
            }
            else {
                res.status(401)
                res.send({success: false, msg: "You seem to be loggedout please login"})
            }
        })
        .catch(error => res.send({success: false, msg: error}))
    }
})

router.post('/changePassword', auth, (req, res) => {
    if (!req.body.password || !req.body.newPassword)
        res.send({success: false, msg: 'All fields are required'})
    else {
        let regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/)
        if (!(regex.test(req.body.password)))
            res.send({success: false, msg: "Incorrect password"})
        else if (!(regex.test(req.body.newPassword)))
            res.send({success: false, msg: "Password requires 1 lower 1 upper case letter and 1 digit and between 5 and 20"})
        else {
            User.findOne({_id: req.id})
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        bcrypt.hash(req.body.newPassword, 10,  (err, hash) => {
                            User.updateOne({_id: req.id}, {password: hash})
                            .then(user => res.send({success: true, msg: "Password has been updated successfully"}))
                            .catch(err => res.send({success: false, msg: err.message}))
                        })
                    } else {
                        res.send({success: false, msg: "Incorrect password"})
                    }
                } else {
                    res.status(401)
                    res.send({success: false, msg: "You seem to be loggedout please login"})
                }
            })
        }
    }
})

router.get('/myOffer', auth, (req, res) => {
    Products.find({creator_id: req.id})
    .then(products => {
        console.log(products)
        if (products) {
            res.send({success: true, msg: products})
        } else {
            res.send({success: false, msg: "No Offers..."})
        }
    })
    .catch(error => res.send({success: false, msg: error}))
})

router.delete('/myOffer/:id', auth, (req, res) => {
    Products.deleteOne({_id: req.params.id, creator_id: req.id}, {justOne: true})
    .then(product => {
        if (product.deletedCount == 1) {
            User.updateOne({_id: req.id}, {$inc: {offers: -1}})
            .then(final => res.send({success: true, msg: "Offer was deleted successfully"}))
            .catch(error => res.send({success: false, msg: error})) 
        } else {
            res.send({success: false, msg: "oops"})
        }
    })
    .catch(error => res.send({success: false, msg: error}))
})

module.exports = router;