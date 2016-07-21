var express = require("express");
var app = express();
var DEFAULT_PORT = 3000;
var math = require('mathjs');
module.exports = app;
var session = require('express-session');
var jwt = require('jsonwebtoken');
//var jwtCheck = require('express-jwt');
var bodyparser = require("body-parser");
var crypto = require("crypto");
var functiondict=require("./function");
var fs = require("fs");
var models = require("./models");
var utils = require("./Utils");
var busboy = require('connect-busboy');
//var cookie=require('cookie-parser');
var apiRoutes = express.Router();
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './route/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname);
    }
});
var storage2 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './route/mediacase');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname);
    }
});
var secret = '42';

app.set('superSecret',secret);
function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-ctr', secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
/*var unless = function(path, middleware) {
    return function(req, res, next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};*/


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

  var token =(req.session.token) || (req.body.token)|| (req.headers.token);


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


app.post("/mediacase", multer({storage: storage2}).single('mediacase'), function (req, res, next) {
  var contents = fs.readFileSync("./route/mediacase/mediacase-mediacase.json");
  var film=utils.film;
  var music=utils.musique;
  var filmmod=models.film;
  var musicmod=models.musique;
  var userfilm=utils.userfilm;
  var Stringsummary=functiondict.string;
  var stringsum=new Stringsummary();
  var filmresult="";
  var musiqueresult="";
  var nbfilm=0;
  var nbmusique=0;
  var iduser=0;
  var idfilm=0;

  var date=new Date().toISOString();
  filmmod.findAll().then(function(results){
       nbfilm=results.length;

       filmresult=results;
       musicmod.findAll().then(function(result){
              musiqueresult=result;
              var jsoncontent=JSON.parse(contents);
              var find=0;
              jsoncontent.forEach(function(jsonObject, i){
                if(i!=0){
                 find=0;
                if(jsonObject.type=='audio'){
                  for(var y=0;y<musiqueresult.length;y++){
                    var row=musiqueresult[y];
                    var taux=stringsum.compareString(jsonObject.titre,row.name);
                    if(taux>=0.8){
                       find=1;
                      break;
                    }
                  }
                  if(find==0){
                    var u1=new music(jsonObject.titre,jsonObject.author,jsonObject.date,jsonObject.length,jsonObject.genre)
                    u1.addmusique(u1,function (err, data) {
                      var request = {
                          "where": {
                              name: jsonObject.titre,
                              director:jsonObject.author,
                              type:jsonObject.genre

                          }
                      }
                      musicmod.findOne(request).then(function(result){
                        if(result){
                          iduser=jsoncontent[0].id;


                        idmusic=result.id;

                        var u1=new usermusique(iduser,idmusic,date);

                        u1.addusermusic(u1,function(err,date){if(err){console.log(err);}});
                        }else{
                          console.log("pas de resultat")
                        }

                      })
                    });
                  }else{
                    var request = {
                        "where": {
                            name: jsonObject.titre,
                            director:jsonObject.author,
                            type:jsonObject.genre

                        }
                    }
                    musicmod.findOne(request).then(function(result){
                      if(result){
                        iduser=jsoncontent[0].id;


                      idmusic=result.id;

                      var u1=new usermusique(iduser,idmusic,date);

                      u1.addusermusic(u1,function(err,date){if(err){console.log(err);}});
                      }else{
                        console.log("pas de resultat")
                      }

                    });
                  }

                }else{

                    for(var y=0;y<nbfilm;y++){
                      var row=filmresult[y];
                      var taux=stringsum.compareString(jsonObject.titre,row.name);

                      if(taux>=0.8){

                        jsonObject.titre=row.name;

                         find=1;
                        break;
                      }
                    }
                    if(find==0){
                      var u1=new film(jsonObject.titre,jsonObject.author,jsonObject.date,jsonObject.length,jsonObject.genre)
                      u1.addfilm(u1,function (err, data) {
                        var request = {
                            "where": {
                                name: jsonObject.titre,
                                director:jsonObject.author,
                                type:jsonObject.genre

                            }
                        }

                        filmmod.findOne(request).then(function(result){

                          if(result){
                            iduser=jsoncontent[0].id;


                          idfilm=result.id;

                          var u1=new userfilm(iduser,idfilm,date);

                          u1.adduserfilm(u1,function(err,date){if(err){console.log(err);}});
                          }else{
                            console.log("pas de resultat")
                          }

                        })
                      });
                    }else{
                    var request = {
                        "where": {
                            name: jsonObject.titre,
                            director:jsonObject.author,
                            type:jsonObject.genre

                        }
                    }


                    filmmod.findOne(request).then(function(result){

                      if(result){
                        iduser=jsoncontent[0].id;

                      idfilm=result.id;

                      var u1=new userfilm(iduser,idfilm,date);

                      u1.adduserfilm(u1,function(err,date){if(err){console.log(err);}});
                      }else{
                        console.log("pas de resultat")
                      }

                    })
                    }


                }
              }
              });
           }).catch(function (err) {
                console.log(err)
             })
    }).catch(function (err) {
        console.log(err)
      })





    res.send();
});
app.post("/plugin", multer({storage: storage}).single('plugin'), function (req, res, next) {
    var plugin = utils.plugin;

  if (req.body.author) {
        console.log("ya body author");
  if(req.file){

    console.log(req.file.originalname)
  var u1 = new plugin(req.file.originalname, req.body.author);
  }else{
  var u1 = new plugin(req.body.originalname, req.body.author);
  }


        u1.addplugin(u1, function (err, data) {
             if(err){

               res.json({
                   "code": 2,
                   "message": "Sequelize error",
                   "error": err
               })
             }else{

                 res.send(data);
             }

        });

    }else{
        console.log("ya pas body author");
    }

});
app.post("/addUser", function (req, res, next) {

    var user = utils.user;
    var u1 = new user();
    u1.adduser(u1, function (undefined, result) {
      res.status(200);
      res.json({
        "user":"created",
        "id":result.dataValues.id
      });

      res.send(result)
    });


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
						"code": 500,
						"message": "Sequelize error",
						"error": "primaryKey"
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
app.get("/:id/ListeFilm", function (req, res, next) {
    var user = models.user;
    var film = models.film;
    var nbuser = 0;
    var nbmovie = 0;
    var userresult="";
    var movieresult="";
    var userfilm = models.userfilm;
    var matricesummary=functiondict.matrice;
    var matriceconst=new matricesummary();
    if(isNaN(req.params.id)){
      res.status(500);
    res.json({
        "code": 2,
        "error": "Id is not a number"
    })
    }else{
    fs.truncate('filmuser.json', 0, function(){console.log('done')})



        user.findAll().then(function (results) {
            nbuser = results.length;
            userresult=results;
        }).catch(function (err) {
              res.status(500);
            res.json({
                "code": 2,
                "message": "Sequelize error in user",
                "error": "Cant't find user"
            })
        })

        film.findAll().then(function (results) {
            nbmovie = results.length;
            movieresult=results;
        }).catch(function (err) {
              res.status(500);
            res.json({
                "code": 2,
                "message": "Sequelize error in film",
                "error": "can't find film"
            })
        })
        userfilm.findAll().then(function (results) {



            var matrice5=matriceconst.generatematrice(nbuser,nbmovie,results);

       var reqstat;
       var cp=0;
         for (var t = 0; t < userresult.length; t++) {
                var rowuser = userresult[t];

                for (var i = 0, len = movieresult.length; i < len; i++) {

                    var row = movieresult[i];


                    if (matrice5.subset(math.index(t, i)) != 0 && rowuser.id==req.params.id) {
                      reqstat =  {
                              "user": rowuser.id,
                              "film": row.name,
                              "director":row.director,
                              "type":row.type,
                              "length":row.length,
                              "date":row.date
                            }

                      if(cp!=0){
                      fs.appendFileSync("filmuser.json", ",")
                      }else{
                        fs.appendFileSync("filmuser.json", '[')

                      }
                      fs.appendFileSync("filmuser.json", JSON.stringify(reqstat) )

                      cp++;
                    }


                }



            }

            fs.appendFile("filmuser.json",  "]", function (err) {
                  if (err) {
                      throw err;
                  }
                    res.status(200);

                    res.sendFile(__dirname+"/filmuser.json");
              })

        }).catch(function (err) {
            res.status(500);
            res.json({
                "code": 2,
                "message": "Sequelize error in userfilm",
                "error": "Error in the matrice."
            })
        })
      }
});



    app.get("/:id/ListeMusique", function (req, res, next) {
    var user = models.user;
    var usermusique = models.usermusique;
    var musique = models.musique;
    var nbuser = 0;
    var nbmusique = 0;
    var userresult="";
    var musiqueresult="";
    var matricesummary=functiondict.matrice;
    var matriceconst=new matricesummary();
    if(isNaN(req.params.id)){
      res.status(500);
    res.json({
        "code": 2,
        "error": "Id is not a number"
    })
    }else{
    fs.truncate('musiqueuser.json', 0, function(){console.log('done')})
        user.findAll().then(function (results) {
            nbuser = results.length;
            userresult=results;
        }).catch(function (err) {
            res.status(500);
            res.json({
                "code": 2,
                "message": "Sequelize error in user",
                "error": "Can't find user"
            })
        })
        musique.findAll().then(function (results) {
            nbmusique = results.length;
            musiqueresult=results;
        }).catch(function (err) {
            res.status(500);
            res.json({
                "code": 2,
                "message": "Sequelize error in musique",
                "error": "can't find music"
            })
        })
        usermusique.findAll().then(function (results) {

          var matrice5=matriceconst.generatematricemusic(nbuser,nbmusique,results);
      var reqstat;
      var cp=0;


         for (var t = 0; t < userresult.length; t++) {
                var rowuser = userresult[t];


                for (var i = 0, len = musiqueresult.length; i < len; i++) {

                    var row = musiqueresult[i];


                    if (matrice5.subset(math.index(t, i)) != 0 && rowuser.id==req.params.id) {
                      reqstat =  {
                              "user": rowuser.id,
                              "singer":row.singer,
                              "title": row.title,
                              "producer":row.producer,
                              "type":row.type,
                              "length": row.length,
                              "date":row.date
                            }

                      if(cp!=0){
                      fs.appendFileSync("musiqueuser.json", ",")
                      }else{
                        fs.appendFileSync("musiqueuser.json", '[')

                      }
                      fs.appendFileSync("musiqueuser.json", JSON.stringify(reqstat) )

                      cp++;
                    }


                }
            }



            fs.appendFile("musiqueuser.json",  "]", function (err) {
                  if (err) {
                      throw err;
                  }
                  res.status(200);

                    res.sendFile(__dirname+"/musiqueuser.json");
              })
        }).catch(function (err) {
            res.status(500);
            res.json({
                "code": 2,
                "message": "Sequelize error in usermusique",
                "error": err
            })
        })
      }
});


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
				  var filePath = "/route/uploads/plugin-"+results.name;
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
var port=process.env.PORT || DEFAULT_PORT;
app.listen(port, function () {
  console.log("server started on port "+port);

    console.log("Server start : ok");
})
