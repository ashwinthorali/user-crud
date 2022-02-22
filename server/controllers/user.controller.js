const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.get = ('/home', (req,res) => {
    User.find({},(err,doc)=>{
        if (err)
            console.log(err);
        else
            console.log(doc);
            res.send(doc);
    })
})

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

module.exports.put = ('/:id', (req,res,next) =>{
    const userId = req.params.id;
    const userInput = req.body;

    // const doc = await User.findById(userId);
    // doc.name = 'jason bourne';
    // await doc.save();

    User.findOneAndUpdate({_id: userId}, {$set: {fullName:userInput.fullName}},(err,doc) => {
        if (err)
            console.log(err);
        else
            console.log(doc);
            res.send(doc);
    })
})

module.exports.delete = ('/:id', (req,res,next) =>{

    const userId = req.params.id;

    User.findOneAndDelete({ _id: userId }, (err, doc) => {
        if (!err)
            console.log(doc, err);
        else
            console.log('error');
        
    });
});