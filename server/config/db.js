const mongoose = require('mongoose');

const mongoDB =() => {
    
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Connected to database"))
    .catch(err=>console.log('Database not connected'))

};

module.exports = mongoDB;