const express = require('express')
const User = require('../models/User')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Router = express.Router()
const jwt = require('jsonwebtoken')

// ADD PRODUCTS TO CART

Router.post("/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        const product = await Product.findById(req.params.id)
        const userCart = await Cart.findOne({ userId: token.user })
        if (user && product) {
            if (userCart) {
                const result = await Cart.findOneAndUpdate({ userId: user.id }, {
                    products: [...userCart.products, {
                        productId: req.body._id,
                        size: req.body.size,
                        color: req.body.color,
                        qty: req.body.qty,
                        price: req.body.price
                    }], total: req.body.total
                }, { new: true })

                res.status(200).json(result)
            } else {
                const cart = new Cart({
                    userId: user.id,
                    products: [
                        {
                            productId: req.body._id,
                            size: req.body.size,
                            color: req.body.color,
                            qty: req.body.qty,
                            price: req.body.price
                        }
                    ],
                    total: req.body.total
                })
                const result = await cart.save()
                res.status(200).json(result)
            }
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// ADD MULTIPLE PRODUCTS TO CART

Router.post("/", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        const userCart = await Cart.findOne({ userId: token.user })
        if (userCart) {
            const res = await Cart.findOneAndUpdate({ userId: user.id }, {
                products: req.body.products.map((item) => (
                    {
                        productId: item.productId,
                        size: item.size,
                        color: item.color,
                        qty: item.qty,
                        price: item.price
                    }
                )), total: req.body.total
            })
        } else {
            const cart = new Cart({
                userId: user.id,
                products: req.body.products.map((item) => (
                    {
                        productId: item.productId,
                        size: item.size,
                        color: item.color,
                        qty: item.qty,
                        price: item.price
                    }
                )),
                total: req.body.total
            })
            await cart.save()
        }
        res.status(200).json("Products added Successfully")
    } catch (error) {
        res.status(403).json(error)
    }
})

// GET USER CART

Router.get("/", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        if (user) {
            const cart = await Cart.find({ userId: user.id })
            res.status(200).json(cart)
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// UPDATE CART PRODUCTS

Router.put("/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await Cart.findOne({ userId: token.user })
        if (user && req.params.id) {
            const filterProducts = user.products.filter((item) => !item._id.toString().includes(req.params.id))
            const cartItem = await Cart.findOneAndUpdate({ userId: user.userId }, { $set: { products: [...filterProducts, { productId: req.body.productId, qty: req.body.qty, size: req.body.size, color: req.body.color, price: req.body.price }], total: req.body.total } }, { new: true })
            res.status(200).json(cartItem)
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// DELETE CART PRODUCTS

Router.put("/delete/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await Cart.findOne({ userId: token.user })
        if (user && req.params.id) {
            const res = await Cart.findOneAndUpdate({ userId: user.userId }, { $pull: { products: { _id: req.params.id } }, total: req.body.total })
        }
        res.status(200).json("Product Deleted Successfully")
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// DELETE USER CART

Router.delete("/", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await Cart.findOne({ userId: token.user })
        if (user) {
            const res = await Cart.findOneAndDelete({ userId: user.userId })
        }
        res.status(200).json("Product Deleted Successfully")
    }
    catch (err) {
        res.status(403).json(err)
    }
})


module.exports = Router