const mongoose = require('mongoose')

const orderScehma = new mongoose.Schema(
    {
        orders: [
            {
                desc:{
                    type: String,
                    required: true,
                },
                qty:{
                    type: Number,
                    required: true
                },
            }
        ],
        amount: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        address: {
            type: Object,
            require: true
        },
        status: {
            type: String,
            default: "Pending"
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Order', orderScehma)