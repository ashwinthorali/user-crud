const mongoose = require('mongoose');

const User = mongoose.model('User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
var stringify = require('json-stringify-safe');
const { use } = require('../routes/index.router');



module.exports.get = ('/home', async(req,res) => {

    //cookie code
    // const cookie = req.cookies['jwt']

    // if(!cookie) return res.status(401).send('Access Denied');

    // const claims = jwt.verify(cookie, "secret")

    // if(!claims) {
    //     return res.status(401).send({
    //         message: "unauthenticated"
    //     })
    // }

    // console.log(claims._id)

    // const user = await User.findOne({_id: claims._id})

    // console.log(user.toJSON())
    // console.log(user._id)

    // // res.send(stringify(claims))
    // // res.send(claims)
    // console.log(user)

    // console.log(claims._id)

    // console.log(user._id.toString())

    // if(user._id.toString() === claims._id) {
    //     User.find({},(err,doc)=>{
    //         if (err)
    //             console.log(err);
    //         else
    //             console.log(doc);
    //             res.send(doc);
    //     })

    // }
    
    //header code
    // const token = req.header('auth-token')

    const authHeader = req.header('Authorization');
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    const bearer = authHeader.split(' ')

    token = bearer[1]

    if(!token) return res.status(401).send('Access Denied');
    
    try{
        const claim = jwt.verify(token, "secret");

        console.log(claim._id)

        const user = await User.findOne({_id: claim._id})

        // if(user._id.toString() === claim._id) {
        //     User.find({},(err,doc)=>{
        //         if (err)
        //             console.log(err);
        //         else
        //             console.log(doc);
        //             res.send(doc);
        //     })
    
        // }

        if(user._id.toString() === claim._id) {
            const users = await User.find({}).limit(pageSize).skip(pageSize * page);
            console.log(users)
            res.send(users)
    
        }


    }catch(err){
        res.status(400).send('invalid token');
    }

    //normal query
    // User.find({},(err,doc)=>{
    //     if (err)
    //         console.log(err);
    //     else
    //         console.log(doc);
    //         res.send(doc);
    // })
})


module.exports.login = ((req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    
    User.find({ email: email}, (err,doc) =>{
        if (bcrypt.compare(password, doc[0].password)) {
            
            console.log(doc[0])
            console.log(doc[0]._id.toString())
            console.log(doc[0].email)
            const token = jwt.sign({_id: doc[0]._id}, "secret", {expiresIn: '1h'})

            console.log(token)
            res.header('auth-token', token).send(token)
            // res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).send({message:'success'})
            // res.send ({message : 'success'})
            // res.send(doc);
        } 
        else {
            console.log(err);
            res.send(err);
        }
    });

    // const user = User.findOne({email: email})
    // console.log(stringify(user))

    // console.log(user._id.toJSON())

    // console.log(user._id)
    // console.log(user.email)

    // const token = jwt.sign({_id: user._id}, "secret")

    // console.log(token)

    // res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})

    // res.send ({message : 'success'})

    // res.send(stringify(token))
});



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
    const users = req.body;

    User.findOneAndUpdate({_id: userId}, {$set: users},(err,doc) => {
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

module.exports.out = ((req,res,next) => {

    res.cookie('jwt','',{maxAge: 0})
    
    res.send({message:'success'})
})