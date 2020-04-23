const express = require('express')
const router = express.Router()
const auth = require('../middelware/auth')
const Products = require('../models/Product')
const User = require('../models/User')
const helpers = require('../middelware/helpers')

function check_product_data(product)
{
    return new Promise((resolve, reject) => {
        if (!product.price || !product.amount || !product.offer || !product.game) {
            reject("All fields are required")
            return;
        }
        const games = ["Dofus", "Wakfu", "DofusTouch"]
        const offers = ['Sell', 'Buy']
        const server = {
            dofus: ["Arty", "Algathe", "Droupik", "Hogmeiser", "Nabur", "Ayuto", "Bilby", "Clustus", "Issering", "Agride", "Atcham", "Brumen", "Eratz", "Echo", "Furye", "Henual", "Ilyzaelle", "Julith", "Jahash", "Mériana", "Merkator", "Nidas", "Ombre(Shadow)", "Oto Mustam", "Pandore", "Rubilax", "Ush"],
            wakfu: ["Aerafal", "Amara", "Dathura", "Elbor", "Nox", "Remington"],
            dofusTouch: ["Brutas", "Dodge", "Grandapan", "Herdegrize", "Oshimo", "Terra Cogita"]
        }

        if (product.price < 1 || product.price > 1000 || isNaN(product.price)) {
            reject("Please keep the Price between 1 and 1000");
            return;
        }
        if (product.amount < 1 || product.amount > 1000 || isNaN(product.amount)) {
            reject("Please keep the Amount between 1 and 1000");
            return;
        }
        if (!offers.includes(product.offer)) {
            reject("The method you choose is not an option")
            return;
        }
        if (games.includes(product.game)) {
            if (product.game === "Dofus" && server.dofus.includes(product.serveur))
                resolve("all good")
            else if (product.game === "Wakfu" && server.wakfu.includes(product.serveur))
                resolve("all good")
            else if (product.game === "DofusTouch" && server.dofusTouch.includes(product.serveur))
                resolve("all good")
            else
                reject("The Server you choose does not belong to your game choice")
        } else {
            reject("The game you choose is not an option")
        }        
    })
}

router.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.Game || !req.body.Serveur || !req.body.Offer || !req.body.Range)
        res.send({success: false, msg: "All fields are required"})
    else if (isNaN(req.body.Page))
        res.send({success: false, msg: "Page Error"}) 
    else {
        // Query to fetch filtered data
        let Game = req.body.Game === 'All' ? /^[D-W]/ : req.body.Game;
        let Serveur = req.body.Serveur === 'All' ? /^/ : req.body.Serveur;
        let Offer = req.body.Offer === 'All' ? /^/ : req.body.Offer;
        let page = req.body.Page * 12;
        console.log(req.body)
        Products.find({game: Game, serveur: Serveur,
        offer: Offer, amount: {$gte: req.body.Range[0], $lte: req.body.Range[1]}}).skip(page).limit(12)
        .then(products => {
            if (products)
                res.send({success: true, msg: products})
            else
            res.send({success: false, msg: "No Matches were found"})
        })
        .catch(error => res.send({success: false, msg: error}))
    }
})

router.post('/create', auth, (req, res) => {
    console.log(req.body)
    const productData = {
        creator_id: req.id,
        amount: req.body.amount,
        offer: req.body.offer,
        game: req.body.game,
        serveur: req.body.serveur,
        price: req.body.price
    }
    check_product_data(productData)
    .then(data =>  User.findOne({_id: req.id}))
    .then(user => {
        if (user) {
            if (user.offers > 9) {
                res.send({success: false, msg: "Your maximaum number of offers is 10 you can delete them from your settings"})
            } else {
                productData.username = user.username;
                productData.avatar = user.avatar;
                Products.create(productData)
                .then(product => {
                    User.updateOne({_id: req.id}, {$inc: {offers: 1}})
                    .then(final => res.send({success: true, msg: product}))
                    .catch(error => res.send({success: false, msg: error})) 
                })
                .catch(error => res.send({success: false, msg: error}))
            }
        } else {
            res.status(401)
            res.send({success: false, msg: "You seem to be loggedout please login"})
        }
    })
    .catch(error => res.send({success: false, msg: error}))
})

router.post('/message', auth, (req, res) => {
    if (!req.body.message)
        res.send({success: false, msg: "Message is required"})
    else {
        User.findOne({_id: req.id})
        .then (user => {
            if (user) {
                User.findOne({_id: req.body.creator_id})
                .then(recipient => {
                    if (recipient) {
                        console.log(user.email)
                        let obj = "SwapValue: " + user.username + " is intrested in your offer";
                        let msg = "<body style='background-color: #ffffff;'><div style='display: block; margin: auto; text-align: center'><span style='color: #111; font-family: Open Sans, sans-serif; font-size: 30px; font-weight: 300; line-height: 28px; margin: 0 0 12px; text-align: center; display: block;'>Hello " +
                        recipient.username + "</span><span style='color: #111; font-family: Source Sans Pro, sans-serif; font-size: 18px; line-height: 32px; margin: 0 0 24px;'>" +
                        user.username + " is intrested in your offer and sent your the following message:</span></div><div style='display: block; margin: auto; text-align: center'><span style='background: #add8e6; color: #111; display: inline-block; font-family: Lato, sans-serif; font-size: 12px; font-weight: bold; line-height: 12px; letter-spacing: 1px; margin: 0 0 30px; padding: 10px 15px 8px;'>" +
                        req.body.message + "</span></div><div style='display: block; margin: auto; text-align: center'><span style='color: #111111; font-size: 16px; margin-top: 20px; text-align: center; text-shadow: 0 1px 1px #fff;'>Sender email: " +
                        user.email + "</span><br><span style='font-style: italic; color: #B6B6B6; font-size: 16px; margin-top: 20px; text-align: center; text-shadow: 0 1px 1px #fff;'> SwapValue team send their regards</span></div>"
                        helpers.SendMail(recipient.email, obj, msg)
                        .then(email => res.send({success: true, msg: email}))
                        .catch(error => res.send({success: false, msg: error}))
                    } else {
                        res.send({success: false, msg: "Offer no longer active"}) 
                    }
                })
                .catch(error => res.send({success: false, msg: error})) 
            } else {
                res.status(401)
                res.send({success: false, msg: "You seem to be loggedout please login"})
            }
        })
        .catch(error => res.send({success: false, msg: error}))
    }
})

module.exports = router