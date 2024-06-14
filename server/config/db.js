const mongoose = require('mongoose');
const connectDb = async ()=>{
    try{
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected Successfully');
    } catch(err){
        console.error(`Error : ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;