const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.register = (req,res,next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if(!err)
            res.send(doc);
        else{
            if (err.code == 11000)
                res.status(422).send(['Duplicate Email address found.']);
            else
                return next(err);
        }
    });
} 

module.exports.delete = ('/:id', (req,res,next) =>{

    const userIdS = req.params.id;

    user.delete((err) => {
        if (!err)
            console.log('deleted successfully');
        else{
            console.log('error');
        }
    })
}