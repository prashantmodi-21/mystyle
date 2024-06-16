const mongoose = require('mongoose')

const cartScehma = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        products: [
            {
                productId:{
                    type: String,
                    required: true,
                },
                size:{
                    type: String,
                    required: true
                },
                color:{
                    type: String,
                },
                price:{
                    type: Number,
                    required: true
                },
                qty:{
                    type: Number,
                    default: 1,
                    required: true 
                }
            }
        ],
        total: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Cart', cartScehma)