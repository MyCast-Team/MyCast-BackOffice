var express = require("express");
var app = express();
require("env.js");
module.exports = app;
var session = require('express-session');
var jwt = require('jsonwebtoken');
//var jwtCheck = require('express-jwt');
var bodyparser = require("body-parser");
var crypto = require("crypto");
var fs = require("fs");
var models = require("./models");
var utils = require("./Utils");
var busboy = require('connect-busboy');
//var cookie=require('cookie-parser');
var apiRoutes = express.Router();
var secret = '42';

app.set('superSecret',secret);
function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-ctr', secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
var unless = function(path, middleware) {
    return function(req, res, next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge:360000}
}));

app.use(bodyparser.urlencoded({
    "extended": true

}));

app.use(function(req, res, next) {
    if(Date.now()>req.session.cookie.expires){

        console.log("test maxage");
       req.session.destroy();
    }
  // if now() is after `req.session.cookie.expires`
  //   regenerate the session
  next();
});




app.use(busboy());
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect CSS bootstrap
app.use("/",express.static('Client'))
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
 // req.headers.authorization=153365;

  var token =(req.session.token) || (req.body.token);

	console.log(req.body.token);

	console.log(token);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        console.log(err);
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {


    res.json({
    "code": 2,
    "message": "Sequelize error",
    "error": "no Token provided"
  })

  }
});
var preExit = [];

// Catch exit
process.stdin.resume ();
process.on ('exit', function (code) {
  var i;

  console.log ('Process exit');

  for (i = 0; i < preExit.length; i++) {
    preExit [i] (code);
  }

  process.exit (code);
});

// Catch CTRL+C
process.on ('SIGINT', function () {

  process.exit (0);
});

// Catch uncaught exception
process.on ('uncaughtException', function (err) {
  console.dir (err, { depth: null });
  process.exit (1);
});


app.post("/connection", function (req, res, next) {
    var admin = models.admin;
	var Token = utils.token;

    var request = {
        "where": {
            login: req.body.login,
            password: encrypt(new Buffer([req.body.password].toString()))
        }
    }
    admin.findOne(request).then(function (results) {
        if (results) {
            //session if cette session correct autoriser connection


			var u1=new Token(results.id);



			u1.addtoken(u1,function(err, token){
				if(err){
            res.status(500);
					  res.json({
						"code": 2,
						"message": "Sequelize error",
						"error": err
					})
				}else{
						var token = jwt.sign(results.id, app.get('superSecret'));
						console.log(token)
						req.session.token = token;
					  res.send(token)


				}
			});


        } else {
            res.status(500)//faire reagir la balise error de l'appel ajax
             res.json({
             "code": 2,
             "message": "Sequelize error",
             "error": "No result"
           })
        }
    }).catch(function (err) {
		console.log(err)
        res.json({
            "code": 2,
            "message": "Sequelize error",
            "error": err
        })
    });

}
);
app.get("/Listepluginjava", function (req, res, next) {
            var plugin = models.plugin;
			console.log("test")
            plugin.findAll().then(function (results) {
                 fs.truncate('plugin.json', 0, function(){console.log('done')})


				res.send(results)

            }).catch(function (err) {
				console.log(err)
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })


    });
	app.get("/getpluginjava/:id", function (req, res, next) {

            var plugin = models.plugin;
            var request = {
                "where": {
                    id: req.params.id
                }
            }
            plugin.findOne(request).then(function (results) {
				console.log(results.name);
				  var filePath = "/uploads/plugin-"+results.name;
				  console.log(filePath)
					res.sendFile(__dirname+filePath)




            }).catch(function (err) {
				console.log(err)
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            });



    });
app.use(apiRoutes);
require('./route')(app);


// Add pre-exit script
preExit.push (function (code) {
		console.log("à faire")
});
app.listen(3000, function () {

    console.log("Server start : ok");
})
