const mongoose = require('mongoose')

const productScehma = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        desc:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        category:{
            type: Array,
            required: true,
        },
        size:{
            type: Array,
            required: true
        },
        color:{
            type: Array,
        },
        price:{
            type: Number,
            required: true,
        },
        inStock:{
            type: Boolean,
            default: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Product', productScehma)