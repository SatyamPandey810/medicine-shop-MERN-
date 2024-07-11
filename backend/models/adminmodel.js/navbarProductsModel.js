const mongoose = require('mongoose')

const navProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: [],
})
const navProductModel = mongoose.model('navbarproducts', navProductSchema)
module.exports = navProductModel