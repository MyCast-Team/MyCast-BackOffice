var models = require("../models");
var utils = require("../Utils");
var fs = require("fs");
module.exports = function (app) {
    app.post("/addmusique", function (req, res, next) {
        var musique = utils.musique;
        console.log(utils);
        if (req.body.singer && req.body.producer && req.body.title && req.body.type) {
            var u1 = new musique(req.body.singer, req.body.producer, req.body.title, req.body.type);
            u1.addmusique(u1, function (err, data) {
            res.send(data);
            });

        }

    });

    app.get("/ListeMusique", function (req, res, next) {

            var musique = models.musique;

            /*var request={};
             if(req.query.limit){
             request.limit=parseInt(req.query.limit);


             }
             if(req.query.offset){
             request.offset=parseInt(req.query.offset);

             }
             if(req.query.lastname){
             request.where={
             "lastname":{
             "$like":"%"+req.query.lastname+"%"
             }
             };
             }*/
            musique.findAll().then(function (results) {
                res.send(results);
            }).catch(function (err) {

                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })


    });
    app.get("/updatemusique/:id", function (req, res, next) {

            var musique = models.musique;
            var request = {
                "where": {
                    id: req.params.id
                }
            }
            musique.find(request).then(function (results) {
                res.send(results)
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            });



    });


    app.delete("/deletemusique/:id", function (req, res, next) {
        var musique = models.musique;
        var request = {
            "where": {
                id: req.params.id
            }
        }
        musique.find(request).then(function (results) {
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
    app.put("/updatemusique", function (req, res, next) {
        var musique = utils.musique;

        var request = {
            "where": {
                id: req.body.id
            }
        }
        var attributes = {};
        if (req.body.singer) {
            attributes.singer = req.body.singer;
        }

        if (req.body.producer) {
            attributes.producer = req.body.producer;
        }
        if (req.body.title) {
            attributes.title = req.body.title;
        }
        if (req.body.type) {
            attributes.type = req.body.type;
        }



        var u1 = new musique();
        u1.update(request, attributes, function (err, data) {
          if(err){
            res.json({
                "code": 2,
                "message": "blaSequelize error",
                "error": err
            })
          }else{
            res.send(data)
          }

        });


    });

}
