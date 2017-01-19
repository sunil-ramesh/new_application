
var connect = require('connect');
var express = require ('express');
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myuserdb');
var db = mongoose.connection;
hash = require('./pass').hash;
var app = express();

var User = require('./models/user')

app.set('view engine',"ejs");
app.set('views', path.join(__dirname, 'views'));
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',function(req,res){
	res.render('index')
});
// **************************************************************************************




app.post('/post',function(req,res){
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	 hash(password, function (err, salt, hash) {
        if (err) throw err;
        var user = new User({
            username: username,
            email : email,
            salt: salt,
            hash: hash,
        }).save(function (err, newUser) {
            if (err) throw err;
            
               else if(user){
                    res.redirect('/');
                    
                }
            });
        });
    });
	

app.listen(3000,function(req,res){
	console.log("server running on 3000")
})