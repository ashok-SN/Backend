import mongoose from "mongoose";

const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlparser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected');

    }catch(err){
        console.log('Database Connection error', err);
        process.exit(1);
    }
}

module.exports = connectDB;