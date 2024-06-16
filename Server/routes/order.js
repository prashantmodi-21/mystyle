const express = require('express')
const User = require('../models/User')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Router = express.Router()
const jwt = require('jsonwebtoken')

// ADD ORDER

Router.post("/", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        const cart = await Cart.find({ userId: token.user })
        if (user && cart) {
            const order = new Order({ userId: user.id, orders: req.body.orders, address: req.body.address, amount: req.body.amount })
            let a = await order.save()
            console.log(a)
            res.status(200).json(order)
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// GET ORDERS

Router.get("/", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        if (user) {
            const orders = await Order.find({ userId: user.id })
            res.status(200).json(orders)
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// GET ALL USERS ORDERS

Router.get("/all", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin) {
            const qNew = req.query.new
            const orders = !qNew ? await Order.find() : await Order.find().sort({ createdAt: -1 }).limit(5)
            res.status(200).json(orders)
        } else {
            res.status(403).json("Enter Valid Credentials")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// GET A ORDER

Router.get("/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin) {
            const OrderId = req.params.id
            const order = await Order.findById(OrderId)
            res.status(200).json(order)
        } else {
            res.status(403).json("Enter Valid Credentials")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A ORDER

Router.delete("/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await Order.findOne({ userId: token.user })
        if (user && req.params.id) {
            const order = await Order.findByIdAndRemove(req.params.id)
            res.status(200).json("Order Removed Successfully")
        }
    }
    catch (err) {
        res.status(403).json(err)
    }
})

// DELETE ORDER BY ADMIN

Router.delete("/admin/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin && req.params.id) {
            const order = await Order.findByIdAndRemove(req.params.id)
            res.status(200).json("Order Removed Successfully")
        } else {
            res.status(403).json("Enter Valid Token")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE ORDER BY ADMIN

Router.put("/admin/:id", async (req, res) => {
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const admin = await User.findById(token.user)
        if (admin.isAdmin && req.params.id) {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json(order)
        } else {
            res.status(403).json("Enter Valid Token")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = Router