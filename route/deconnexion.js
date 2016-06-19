var models = require("../models");
var utils = require("../Utils");

var jwt = require('jsonwebtoken');
var fs = require("fs");
module.exports = function (app) {

    app.get("/Deco", function (req, res, next) {
			var tokenmodel=models.token;
			var tokenutils=utils.token;

			var token=(req.session.token) || (req.body.token);
			console.log(token);
			 jwt.verify(token, app.get('superSecret'), function(err, decoded) {
				if (err) {
				console.log(err);

				res.json({
					"code": 2,
					"message": "Sequelize error",
					"error": err
				})
				} else {

        // if everything is good, save to request for use in other routes
					var id=decoded;
					 var request = {
							"where": {
								idUser: id

							}
						}
					tokenmodel.findOne(request).then(function (results) {
						if (results) {
							//session if cette session correct autoriser connection


							var u1=new tokenutils();


							console.log(results.idUser)
							u1.delete(results.idUser,function(err, token){
								if(err) {
									console.log(err);
										fs.readFile("./views/connection.html", function (err, data) {
											res.type("html");

											res.send(data.toString().split("$val").join("You were not connected"));
									})
								}else{
									req.session.destroy();
									fs.readFile("./views/home.html", function (err, data) {
										res.type("html");

										res.send(data.toString());
									})


							}});

						} else {

              res.json({
                  "code": 2,
                  "message": "blaSequelize error",
                  "error": "You were not connected"
              })
						}
					}).catch(function (err) {
						console.log(err)

					});

				}
			});



	})
}
