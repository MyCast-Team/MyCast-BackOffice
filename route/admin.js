var models = require("../models");
var utils = require("../Utils");
var fs = require("fs");
var crypto = require("crypto");
var secret = '42';
function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-ctr', secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher('aes-256-ctr', secret)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
module.exports = function (app) {
    app.post("/addadmin", function (req, res, next) {
        var admin = utils.admin;
        if (req.body.login && req.body.pass && req.body.email && req.body.cpass) {
            if (req.body.pass == req.body.cpass) {
                var mdp = encrypt(new Buffer([req.body.pass].toString()))
                var u1 = new admin(req.body.login, mdp, req.body.email);
                u1.addadmin(u1, function (err, data) {
                    res.redirect("/ListeAdmin");
                });
            } else {
                res.json({
                    "code": 2,
                    "err": "error in password confirmation"
                })
            }
        }

    });
    app.get("/ListeAdmin", function (req, res, next) {

            var admin = models.admin;
            admin.findAll().then(function (results) {
              res.send(results)
            }).catch(function (err) {

                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })

    });
    app.get("/updateadmin/:id", function (req, res, next) {

        var admin = models.admin;
        var request = {
            "where": {
                id: req.params.id
            }
        }
        admin.find(request).then(function (results) {
            res.send(results)
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            })
        });

    });
    app.delete("/deleteadmin/:id", function (req, res, next) {
        var admin = models.admin;
        var request = {
            "where": {
                id: req.params.id
            }
        }
        admin.find(request).then(function (results) {
            if (results) {

                results.destroy().then(function (suc) {

                    res.json({
                        "code": 0,
                        "result": true
                    })
                }).catch(function (err) {
                    res.json({
                        "code": 2,
                        "message": "Sequelize error1",
                        "error": err
                    })
                })
            } else {
                res.json({
                    "code": 0,
                    "result": false
                })
            }

        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "blaSequelize error",
                "error": err
            })
        });
    });
    app.post("/updateadmin", function (req, res, next) {
        var admin = utils.admin;
        var confirm = 0;
        var request = {
            "where": {
                id: req.body.id
            }
        }
        var attributes = {};
        if (req.body.login) {
            attributes.login = req.body.login;
        }

        if (req.body.pass && req.body.cpass) {

            if (req.body.pass == req.body.cpass) {
                var mdp = encrypt(new Buffer([req.body.pass].toString()))
                attributes.password = mdp;

            } else {
                confirm = 1;
            }

        }

        if (req.body.email) {
            attributes.email = req.body.email;
        }

        if (confirm != 1) {
            var u1 = new admin();
            u1.update(request, attributes, function (err, data) {
                res.send(data);
            });
        } else {
          res.json({
              "code": 2,
              "message": "Sequelize error",
              "error": "Wrong password"
          })
        }
    });
}
