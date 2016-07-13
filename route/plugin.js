var models = require("../models");
var utils = require("../Utils");



var fs = require("fs");
module.exports = function (app) {


    app.get("/Listeplugin", function (req, res, next) {

            var plugin = models.plugin;


            plugin.findAll().then(function (results) {
              res.send(results);
            }).catch(function (err) {

                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })


    });

    app.get("/updateplugin/:id", function (req, res, next) {

            var plugin = models.plugin;
            var request = {
                "where": {
                    id: req.params.id
                }
            }
            plugin.find(request).then(function (results) {
                res.send(results);
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            });



    });


    app.delete("/deleteplugin/:id", function (req, res, next) {
        var plugin = models.plugin;
        var request = {
            "where": {
                id: req.params.id
            }
        }
        plugin.find(request).then(function (results) {
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
    app.post("/updateplugin", function (req, res, next) {
        var plugin = utils.plugin;
        var request = {
            "where": {
                id: req.body.id
            }
        }
        var attributes = {};
        if (req.body.name) {
            attributes.name = req.body.name;
        }

        if (req.body.author) {
            attributes.author = req.body.author;
        }


        var u1 = new plugin();
        u1.update(request, attributes, function (err, data) {
            res.json({
                "code": 2,
                "plugin": data
            })
        });


    });


}
