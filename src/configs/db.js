

const mongoose = require('mongoose');

module.exports = async () => {
    return mongoose.connect("mongodb+srv://Shanky:Shanky007@cluster0.nkaby.mongodb.net/Brand&Beyond")
}