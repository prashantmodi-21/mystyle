const express = require('express')
const User = require('../models/User')
const Router = express.Router()
const { body } = require('express-validator');
const jwt = require('jsonwebtoken')

// UPDATE USER

Router.put('/update', async(req, res)=>{
    try{
        if(req.headers.token){
            const verifyToken = jwt.verify(
                req.headers.token,
                process.env.JWT_KEY
            )
            const user = await User.findByIdAndUpdate(verifyToken.user, {username: req.body.username, name: req.body.name, email: req.body.email, phone: req.body.phone, password: req.body.password})
            res.status(200).json("Username: "+ user.username)
        }else{
            res.status(403).json("No User Found")
        }
    }catch(err){
        res.status(500).json(err)
    }
    
})

// DELETE USER

Router.delete('/delete', async(req, res)=>{
    try{
        if(req.headers.token){
            const verifyToken = jwt.verify(
                req.headers.token,
                process.env.JWT_KEY
            )
            const user = await User.findByIdAndRemove(verifyToken.user)
            res.status(200).json(user.username)
        }else{
            res.status(403).json("No User Found")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

// GET SORTED USER

Router.get("/", async(req,res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if(admin.isAdmin){
            const qNew = req.params.new
            const users = !qNew ? await User.find({}) : await User.find({}).sort({createdAt: -1}).limit(5)
            res.status(200).json(users)
        }else{
            res.status(403).json("Enter Correct Credentials")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

// GET A USER

Router.get("/:id", async(req,res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if(admin.isAdmin){
            const userId = req.params.id
            const users = await User.findById(userId)
            res.status(200).json(users)
        }else{
            res.status(403).json("Enter Correct Credentials")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

// UPDATE USER BY ADMIN

Router.put("/:id", body('username').isLength({min: 6}), body('name').isLength({min: 6}),
body('email').isEmail(),
body('password').isLength({min: 6}), async(req, res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if(admin.isAdmin && req.params.id){
                const users = await User.findByIdAndUpdate(req.params.id, req.body)
                res.status(200).json(users)
        }else{
            res.status(403).json("Enter Correct Credentials")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

// DELETE USER BY ADMIN

Router.delete("/:id", async(req, res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if(admin.isAdmin && req.params.id){
                const users = await User.findByIdAndRemove(req.params.id)
                res.status(200).json("User Removed Successfully: "+ users.username)
        }else{
            res.status(403).json("Enter Correct Credentials")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = Router