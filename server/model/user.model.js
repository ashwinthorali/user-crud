const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        // required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        // required: 'Email can\'t be empty',
        // unique: true
    },
    password: {
        type: String,
        // required: 'Password can\'t be empty',
        // minlength: [4, 'Password must be atleast 4 character long']
    },
    saltSecret: {
        type: String
    },
});

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRegex.test(val);
}, 'invalid Email');

userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);