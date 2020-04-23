const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helpers = require('../middelware/helpers')

const User = require("../models/User")

router.post('/', (req, res) => {
    if (!req.body.email || !req.body.password)
        res.send({success: false, msg: "All fields are required"})
    else {
        User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {id: user._id}
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 604800
                    })
                    res.send({success: true, msg: token, info: {email: user.email, username: user.username, avatar: user.avatar}})
                } else {
                    res.send({success: false, msg: "User does not exist"})
                }
            } else {
                res.send({success: false, msg: "User does not exist"})
         }})
        .catch(err => res.send({success: false, msg: err}))
    }
})

router.post('/forgotPassword', (req, res) => {
    if (!req.body.email)
        res.send({success: false, msg: "All fields are required"})
    else {
        let vkey = Math.random().toString(36).substr(3) + Math.random().toString(36).substr(3);
        User.findOneAndUpdate({email: req.body.email}, {password_reset_key: vkey})
        .then(user => {
            if (user) {
                let msg = "<body style='background-color: #ffffff;'><div style='display: block; margin: auto; text-align: center'><span style='color: #111; font-family: Open Sans, sans-serif; font-size: 30px; font-weight: 300; line-height: 28px; margin: 0 0 12px; text-align: center; display: block;'>Hello " +
                user.username + "</span><span style='color: #111; font-family: Source Sans Pro, sans-serif; font-size: 18px; line-height: 32px; margin: 0 0 24px;'>You recently requested to reset your password use the code below to do so</span></div><div style='display: block; margin: auto; text-align: center'><span style='background: #add8e6; color: #111; display: inline-block; font-family: Lato, sans-serif; font-size: 12px; font-weight: bold; line-height: 12px; letter-spacing: 1px; margin: 0 0 30px; padding: 10px 15px 8px;'>"
                + vkey + "</span></div><div style='display: block; margin: auto; text-align: center'><span style='font-style: italic; color: #B6B6B6; font-size: 16px; margin-top: 20px; text-align: center; text-shadow: 0 1px 1px #fff;'> SwapValue team send their regards</span></div>"
                helpers.SendMail(req.body.email, "SwapValue password reset", msg)
                .then(mail => res.send({success: true, msg: "The reset Email has been sent successfully"}) )
                .catch(error => res.send({success: false, msg: "Email did not get delivered"}) )
            } else {
                res.send({success: false, msg: "User does not exist"})
        }})
        .catch(err => res.send({success: false, msg: err}))
    }
})

router.post('/resetPassword', (req, res) => {
    let passRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/)
    if (!req.body.vkey || !req.body.password)
        res.send({success: false, msg: "All fields are required"})
    else if (!(passRegex.test(req.body.password)))
        res.send({success: false, msg: "Password requires 1 lower 1 upper case letter and 1 digit and between 5 and 20"})
    else {
        bcrypt.hash(req.body.password, 10,  (err, hash) => {
            User.findOneAndUpdate({password_reset_key: req.body.vkey}, {password: hash, password_reset_key: ""})
            .then(user => {
                if (user)
                    res.send({success: true, msg: "Your password was reset successfully"})
                else 
                    res.send({success: false, msg: "Verification key does not match"})
            })
            .catch(error => res.send({success: false, msg: error})) 
    })}
})

module.exports = router