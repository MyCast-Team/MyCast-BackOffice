var models = require("../models");
var utils = require("../Utils");
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname);
    }
});


var fs = require("fs");
module.exports = function (app) {
    app.post("/plugin", multer({storage: storage}).single('plugin'), function (req, res, next) {

        var plugin = utils.plugin;

        if (req.body.author) {
            console.log(req.body.author);
			if(req.file){
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

        }
		console.log("fin du game")
    });

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
    app.put("/updateplugin", function (req, res, next) {
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
