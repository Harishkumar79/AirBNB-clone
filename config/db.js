const mongoose = require("mongoose");


MONGO_URL = "mongodb://127.0.0.1:27017/AirBNB";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log(`Connected to database ${conn.connection.host} successfully`);

        mongoose.connection.on( "error" ,(err) => 
           { console.log("MongoDB error", err)}
        )
        
    } catch (error) {
        console.log("connection to data base refuses" , error);
    }
}

module.exports = connectDB;