
var models = require("../models");
var utils = require("../Utils");
var fs = require("fs");


module.exports = function (app) {


    app.get("/ListeFilm", function (req, res, next) {

            var film = models.film;


            film.findAll().then(function (results) {
              res.send(results);
            }).catch(function (err) {

                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })


    });



    app.delete("/deletefilm/:id", function (req, res, next) {
        var film = utils.film;
        var u1 = new film();
        if (req.params.id) {
            u1.delete(req.params.id, function (result) {
                res.send(result);
            });
        }
    });
    app.get("/updatefilm/:id", function (req, res, next) {

            var film = models.film;

            var request = {
                "where": {
                    id: req.params.id
                }
            }
            film.find(request).then(function (results) {

                res.send(results)
            }).catch(function (err) {

                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                })
            })


    });
    app.put("/updatefilm", function (req, res, next) {
        var film = utils.film;
        var request = {
            "where": {
                id: req.body.id
            }
        }


        var attributes = {};
        if (req.body.name) {
            attributes.name = req.body.name;
        }

        if (req.body.director) {
            attributes.director = req.body.director;
        }
        if (req.body.date) {
            attributes.date = req.body.date;
        }


        var u1 = new film();
        u1.update(request, attributes, function (err, data) {
            res.send("/ListeFilm");
        });


    });
    app.post("/addfilm", function (req, res, next) {
        var film = utils.film;

        if (req.body.title && req.body.director && req.body.date) {
            var title = req.body.title;
            var director = req.body.director;
            var date = req.body.date;

            var u1 = new film(title, director, date);
            u1.addfilm(u1, function (err, data) {
                res.send(data)
            });

        }

    });

}
