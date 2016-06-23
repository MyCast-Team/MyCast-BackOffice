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
	/*	it("should not be authorized to create a new contact with a registered id", function(done){
			return request(api).post('/connection').type('form').send({ login: 'test', password: 'test2016' }).expect(500).expect({
				"code": 500,
				"message": "Sequelize error",
				"error": "primaryKey"
			});
		})*/
	})
	describe("GET /ListeUser",function(){
		it("should  display a list of user", function(){
			return request(api).get('/ListeUser').send().expect(200);
		})

	})
	/*describe("GET /Deco",function(){
		it("should delete token", function(done){
			return request(api).get('/Deco').type('form').send({token :"eyJhbGciOiJIUzI1NiJ9.Ng.hAGbSbFGDZMTqtfa7xzAVtf3ThZF_6KOJYjRVcFPaYI"}).expect(200);
		})
	})*/
});
