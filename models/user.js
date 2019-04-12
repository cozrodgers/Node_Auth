//use mongoose
const mongoose = require('mongoose');

//define db name
const database_name = "nodeauth";

//use bcrypt here..
var bcrypt = require('bcryptjs');

//create mongoose connection variable
const db = mongoose.connection;
//db settings (use new URL parser)
mongoose.connect(`mongodb://localhost/${database_name}`, { useNewUrlParser: true })

//set db to use a create index
mongoose.set('useCreateIndex', true);


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

//functions to find id and usernames 
User.getUserById = (id, callBack)  => User.findById(id, callBack);
User.comparePassword = (candidatePassword, hash, callBack)  => {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callBack(null, isMatch);
  
    }) 
};

User.getUserByUsername = (Username, callBack)  => {
    const query = {Username : Username};
    User.findOne(query, callBack);
}

//Export this function that creates the user
module.exports.createUser = function(newUser, callBack){
    
    //start encryption here
    bcrypt.genSalt(10, function(err, salt) {
        // Params ( What we want to encrypt, callback function)
        bcrypt.hash(newUser.Password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.Password= hash;
            //Save all above to the new user
            newUser.save(callBack);
        });
    });

 

}