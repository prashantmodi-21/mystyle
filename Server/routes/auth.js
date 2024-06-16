const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator');
const CryptoJS = require('crypto-js')
const User = require('../models/User');
const jwt = require('jsonwebtoken')

// REGISTER USER

Router.post('/register', body('username').isLength({ min: 6 }), body('name').isLength({ min: 6 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const encrypted = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PHRASE).toString();
            const user = new User({
                username: req.body.username,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: encrypted,
                isAdmin: req.body.isAdmin
            })
            await user.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    })
    
// LOGIN USER

Router.post('/login', body('username').isLength({ min: 6 }),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                res.status(401).json("Enter Valid Username");
            } else {
                const decrypted = CryptoJS.AES.decrypt(user.password, process.env.SEC_PHRASE).toString(CryptoJS.enc.Utf8);
                if (decrypted === req.body.password.toString()) {
                    const tokenKey = jwt.sign({
                        user: user.id,
                    }, process.env.JWT_KEY)
                    const { password, ...other } = user._doc
                    res.status(200).json({ ...other, tokenKey })
                } else {
                    res.status(401).json("Enter Valid Password");
                }
            }

        }
        catch (err) {
            res.status(500).json("Its Our Fault")
        }
    })

// ADMIN LOGIN

Router.post('/admin', body('username').isLength({ min: 6 }),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                res.status(401).json("Enter Valid Username");
            } else if (!user.isAdmin) {
                res.status(401).json("Enter Valid User");
            }
            else {
                const decrypted = CryptoJS.AES.decrypt(user.password, process.env.SEC_PHRASE).toString(CryptoJS.enc.Utf8);
                if (decrypted === req.body.password.toString()) {
                    const tokenKey = jwt.sign({
                        user: user.id,
                    }, process.env.JWT_KEY, { expiresIn: "1d" })
                    const { password, ...other } = user._doc
                    res.status(200).json({ ...other, tokenKey })
                } else {
                    res.status(401).json("Enter Valid Password");
                }
            }

        }
        catch (err) {
            res.status(500).json("Its Our Fault")
        }
    })

module.exports = Router