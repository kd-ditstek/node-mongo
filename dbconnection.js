const mongoose = require("mongoose");

// connect to DB
try{
    mongoose.connect("mongodb://localhost:27017/cwpsdb", {
    });
    console.log("connected to db");
}catch(error){
    handleError(error)
}

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
  })