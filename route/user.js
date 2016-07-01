var models = require("../models");
var utils = require("../Utils");
var fs = require("fs");
module.exports = function (app) {


    app.get("/ListeUser", function (req, res, next) {
        var user = models.user;


            user.findAll().then(function (results) {
                res.send(results);
            }).catch(function (err) {

                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })


    });






    app.delete("/deleteuser/:id", function (req, res, next) {
        var user = utils.user;
        var u1 = new user();
        if (req.params.id) {
            u1.delete(req.params.id, function (result) {
              res.status(200);
              res.json({
                "user":"deleted"
              })
                res.send(result);
            })
        }
    });
    app.post("/addUser", function (req, res, next) {

        var user = utils.user;
        var u1 = new user();
        u1.adduser(u1, function (undefined, result) {
          res.status(200);
          res.json({
            "user":"created"
          });
          res.send(result)
        });


    });

}
