const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const DBconfig=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI) // Add your MongoDB connection string here
        console.log('Connected to MongoDB');

        
    }catch(error)
    {
        console.log('Error in connecting to MongoDB',error);
    }
   
}
module.exports = DBconfig;