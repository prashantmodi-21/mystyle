const express = require('express')
const User = require('../models/User')
const Product = require('../models/Product')
const Router = express.Router()
const jwt = require('jsonwebtoken')

// ADD A PRODUCT

Router.post("/", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin) {
            const Products = new Product(req.body)
            await Products.save()
            res.status(200).json(Products)
        } else {
            res.status(403).json("Enter Valid Credentials")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL PRODUCTS

Router.get("/all", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin) {
            const Products = await Product.find({})
            res.status(200).json(Products)
        } else {
            res.status(403).json("Enter Valid Credentials")
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// GET SORTED PRODUCTS

Router.get("/", async (req, res) => {
    try {
        const qSort = req.query.sort
        const qFilter = req.query.filter
        if (qSort) {
            const Products = await Product.find().sort({ createdAt: -1 })
            res.status(200).json(Products)
        } else if (qFilter) {
            const Products = await Product.find({ category: { $in: [qFilter] } })
            res.status(200).json(Products)
        } else {
            const Products = await Product.find({})
            res.status(200).json(Products)
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// GET A PRODUCT

Router.get("/:id", async (req, res) => {
    try {
        const Products = await Product.findById(req.params.id)
        res.status(200).json(Products)
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// UPDATE A PRODUCTS

Router.put("/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin && req.params.id) {
            const Products = await Product.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json(Products)
        } else {
            res.status(403).json("Enter Valid Credentials")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A PRODUCT

Router.delete("/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin && req.params.id) {
            const Products = await Product.findByIdAndRemove(req.params.id)
            res.status(200).json("Product Removed Successfully: " + Products.title)
        } else {
            res.status(403).json("Enter Valid Credentials")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = Router