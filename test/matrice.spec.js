var request = require("supertest-session");
var api=require("../index.js");
var chai = require('chai');
var expect = chai.expect;
var Matricesummary = require('./../function/matrice.js');


describe('Matricesummary',function(){
	describe('generatematrice',function(){
		it("generatematrice should return a 0 if no items are passed in", function(){
			var matrice=new Matricesummary();
			expect(matrice.generatematrice()).to.equal(0);
		})
		it("generatematrice should return an array", function(){
			var matrice=new Matricesummary();
			resultuser=[{
				"id":1
			},
			{
				"id":2
			},
			{
				"id":3
			}
			]
			resultmovie=[{
				"id":1
			},
			{
				"id":2
			},
			{
				"id":3
			}
			]
			results=[{
				"idUser":1,
				"idFilm":2
			},
			{
				"idUser":2,
				"idFilm":1
			},
			{
				"idUser":2,
				"idFilm":3
			}]

			expect(matrice.generatematrice(resultuser,resultmovie,results)).that.is.an('object');
		})
	})
	describe('generatematricemusic',function(){
		it("generatematricemusic should return a 0 if no items are passed in", function(){
			var matrice=new Matricesummary();
			expect(matrice.generatematricemusic()).to.equal(0);
		})
		it("generatematricemusic should return an object", function(){
			var matrice=new Matricesummary();
			resultuser=[{
				"id":1
			},
			{
				"id":2
			},
			{
				"id":3
			}
			]
			resultmusic=[{
				"id":1
			},
			{
				"id":2
			},
			{
				"id":3
			}
			]
			results=[{
				"iduser":1,
				"idmusique":2
			},
			{
				"iduser":2,
				"idmusique":1
			},
			{
				"iduser":3,
				"idmusique":3
			}]

			expect(matrice.generatematricemusic(resultuser,resultmusic,results)).that.is.an('object');
		})
	})

});
