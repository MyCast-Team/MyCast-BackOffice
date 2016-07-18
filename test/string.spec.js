var request = require("supertest-session");
var api=require("../index.js");
var chai = require('chai');
var expect = chai.expect;
var Stringsummary = require('./../function/string.js');


describe('Stringsummary',function(){
	describe('letterPair',function(){
		it("letterPair should return a0 if no items are passed in", function(){
			var string=new Stringsummary();
			expect(string.letterPair()).to.equal(0);
		})
		it("letterPair should return an array", function(){
			var string=new Stringsummary();
			var str="FRANCE";

			expect(string.letterPair(str)).that.is.an('array');
		})
	})
	describe('wordletterPair',function(){
		it("wordletterPair should return a0 if no items are passed in", function(){
			var string=new Stringsummary();
			expect(string.wordLetterPair()).to.equal(0);
		})
		it("worldletterPair should return an array", function(){
			var string=new Stringsummary();
			var str="FRANCE";

			expect(string.wordLetterPair(str)).that.is.an('array');
		})
	})

	describe('compareString',function(){
		it("compareString should return a if one or no items are passed in", function(){
			var string=new Stringsummary();
			expect(string.compareString("","FRANCE")).to.equal(0);
		})
		it("compareString should return a if one or no items are passed in", function(){
			var string=new Stringsummary();
			expect(string.compareString()).to.equal(0);
		})
		it("compareString should return an rate", function(){
			var string=new Stringsummary();
			var str="FRANCE";
			var str2="FRENCH"
			expect(string.compareString(str,str2)).to.equal(0.4);
		})
	})
});
