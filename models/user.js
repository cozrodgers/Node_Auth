const mongoose = require('mongoose');
const database_name = "nodeauth";

mongoose.connect(`mongodb://localhost/${database_name}`)

//create mongoose connection variable
const db = mongoose.connection;


//Begin Schema of User 
const UserSchema = mongoose.Schema({

//Define User Fields Here
    Username:{
        type:String,
        index:true
    },
    Password:{
        type:String,
    },
    Email:{
        type: String,
    },
    Name:{
        type: String,
    },
    avatar:{
        type: String,
    },

});


//Allow for this File to be used outside of this file and in ('./app.js')
const User = module.exports = mongoose.model('User', UserSchema);

//Export this function that creates the user
module.exports.createUser = function(newUser, callBack){
    newUser.save(callBack);
}