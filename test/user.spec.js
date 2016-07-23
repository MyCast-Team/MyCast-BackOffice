var request = require("supertest-session");
var api=require("../index.js");


describe('user',function(){
	describe('GET /',function(){
		it("should return a webpage", function(){
			return request(api).get('/').send().expect(200);
		})
	})

	describe("POST /connection",function(){
		it("should generate token", function(done){
			var data={login: 'test',password: 'test2016'};
			return request(api).post('/connection').type('form').send(data).expect(200).end(function(err){
				if(err){
					done(err);
				}else{
					done();
				}
			});

		})

	})
	describe("GET /ListeUser",function(){
		it("should  display a list of user", function(){
			return request(api).get('/ListeUser').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(200);
		})
	})
	/*	describe("POST /adduser",function(){
			it("should add user" , function(){

				return request(api).post('/adduser').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(200).expect({"user":"created"});
			})*
	})*/
	describe("GET /Deco",function(){
		it("should delete token", function(){
			return request(api).get('/Deco').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(200);
		})
	})
	describe("GET /:id/ListeFilm",function(){
		it("should get an error", function(){
			return request(api).get('/a/ListeFilm').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(500).expect({
				"code":"2",
				"error":"Id is not a number",

			});
		})
		it("should get an Answer", function(){
			return request(api).get('/1/ListeFilm').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(200);
		})
	})
	describe("GET /:id/ListeMusique",function(){
		it("should get an error", function(){
			return request(api).get('/a/ListeMusique').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(500).expect({
				"code":"2",
				"error":"Id is not a number",

			});
		})
		it("should get an Answer", function(){
			return request(api).get('/7/ListeMusique').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(200);
		})
	})
});
