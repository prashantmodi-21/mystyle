const express = require('express')
const User = require('../models/User')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Router = express.Router()
const jwt = require('jsonwebtoken')

Router.post("/:id", async(req,res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        const product = await Product.findById(req.params.id)
        const userCart = await Cart.findOne({userId: token.user})
        if(user && product){
            if(userCart){
                const res = await Cart.findOneAndUpdate({userId: user.id}, {products: [...userCart.products, {productId: req.body._id,
                    size: req.body.size,
                    color: req.body.color,
                    qty: req.body.qty,
                    price: req.body.price}]})
            }else{
                const cart =  new Cart({
                    userId: user.id,
                    products: [
                        {
                            productId: req.body._id,
                            size: req.body.size,
                            color: req.body.color,
                            qty: req.body.qty,
                            price: req.body.price
                        }
                    ]
                })
                await cart.save()
            }
            res.status(200).json(product)
        }
    }
    catch(err){
        res.status(403).json(err)
    }
})
Router.post("/", async(req,res)=>{
    try {
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        const userCart = await Cart.findOne({userId: token.user})
        if(userCart){
            const res = await Cart.findOneAndUpdate({userId: user.id}, {products: req.body.map((item)=>(
                {
                    productId: item._id,
                    size: item.size,
                    color: item.color,
                    qty: item.qty,
                    price: item.price
                }
            ))})
        }else{
            const cart =  new Cart({
                userId: user.id,
                products: req.body.map((item)=>(
                    {
                        productId: item._id,
                        size: item.size,
                        color: item.color,
                        qty: item.qty,
                        price: item.price
                    }
                ))
            })
            await cart.save()
        }
        res.status(200).json("Products added Successfully")
    } catch (error) {
        res.status(403).json(error)
    }
})
Router.get("/", async(req,res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await User.findById(token.user)
        if(user){
            const cart = await Cart.find({userId: user.id})
            res.status(200).json(cart)
        }
    }
    catch(err){
        res.status(403).json(err)
    }
})

Router.put("/:id", async(req, res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await Cart.findOne({userId: token.user})
        if(user && req.params.id){
            const filterProducts = user.products.filter((item)=> item.productId !== req.params.id)
            const cartItem = await Cart.findOneAndUpdate({userId: user.userId, $set: {products: [...filterProducts, {productId: req.params.id, qty: req.body.quantity, size: req.body.size, color: req.body.color, price: req.body.price}]}})
        }
        res.status(200).json("Product Updated Successfully")
    }
    catch(err){
        res.status(403).json(err)
    }
})
Router.delete("/:id", async(req, res)=>{
    try{
        const token = jwt.verify(
            req.headers.token,
            process.env.JWT_KEY
        )
        const user = await Cart.findOne({userId: token.user})
        if(user && req.params.id){
            const res = await Cart.findOneAndUpdate({userId: user.userId}, {userId: user.userId, $pull: {products: {productId: req.params.id}}})
        }
        res.status(200).json("Product Deleted Successfully")
    }
    catch(err){
        res.status(403).json(err)
    }
})


module.exports = Router