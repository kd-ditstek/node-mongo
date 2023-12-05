var mongoose = require("mongoose"),
Schema = mongoose.Schema;

// user Schema
 var userSchema = new Schema({
    first_name: {
        type: String,
        require: [true, "First name is required"]
    },
    last_name: {
        type: String,
        require: [true, "Last name is required"]
    },
    email: {
        type: String,
        unique: [true, "email already exists in system!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
      },
    created: {
        type: Date,
        default: Date.now
    }
 })

 module.exports = mongoose.model('User', userSchema)