const express = require('express')
const app = express()
const Auth = require('./routes/auth')
const User = require('./routes/user')
const Product = require('./routes/product')
const Cart = require('./routes/cart')
const Order = require('./routes/order')
const Payment = require('./routes/payment')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGO_URL)
try {
    console.log("DB Connected Successfully")
} catch (error) {
    console.log(error)
}
app.use(
    bodyParser.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    })
);
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', Auth)
app.use('/api/user', User)
app.use('/api/product', Product)
app.use('/api/cart', Cart)
app.use('/api/order', Order)
app.use('/api/checkout', Payment)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is Running on Port "+ process.env.PORT)
})