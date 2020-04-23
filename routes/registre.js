const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require("../models/User")
const helpers = require("../middelware/helpers")

router.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.avatar)
        res.send({success: false, msg: "All fields are required"})
    else {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        }
        helpers.CheckData(userData)
        .then(resp => {
            User.findOne({email: req.body.email})
            .then (email => {
            if (!email) {
                User.findOne({username: req.body.username})
                .then(user => {
                if (user) {
                    res.send({success: false, msg: "Username already taken"})
                } else {
                    bcrypt.hash(req.body.password, 10,  (err, hash) => {
                        userData.password = hash;
                        User.create(userData)
                        .then(user => res.send({success: true, msg: "Registration was successful"}))
                        .catch(err => res.send({success: false, msg: err.message}))
                    })
                }})
                .catch(err => res.send({success: false, msg: err}))
            } else {
                res.send({success: false, msg: "Email already exists"})
            }})
            .catch(err => res.send({success: false, msg: err}))
        })
        .catch(err => res.send({success: false, msg: err}))
    }
})

module.exports = router;